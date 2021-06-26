import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";
import isForeignUrl from "./is-foreign-url";
import {ResponseData} from "@privacy-tracker/storage";

let browser: Browser;

export async function killBrowser() {
    if (browser) {
        await browser.close()
    }
}

export interface CollectedData {
    headers: {}
    deps: ResponseData[]
    redirects: ResponseData[]
}

const collectData = async (url): Promise<CollectedData> => {
    const pageUrl = new URL(url);
    if (!browser) {
        console.log("Creating a new browser.");
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                "--single-process",
                "--disable-gpu",
            ],
        });
    }
    const urls: ResponseData[] = [];
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('response', (response) => {
        const requestUrl = new URL(response.url());
        if (isForeignUrl(pageUrl, requestUrl)) {
            urls.push({
                method: response.request().method(),
                status: response.status(),
                url: response.url(),
                data: response.request().postData() ? response.request().postData() : null,
            })
        }
    });
    page.on('request', (request) => request.continue())

    await page.setDefaultNavigationTimeout(4000);
    await page.setViewport({
        width: 1200,
        height: 1000,
        deviceScaleFactor: 1,
    });
    const response = await page.goto(url, {waitUntil: 'networkidle2'});
    const redirects = []
    response.request().redirectChain().forEach(link => {
        redirects.push({
            status: link.response().status(),
            url: link.url()
        })
    })
    redirects.push({
        status: response.status(),
        url: response.url()
    })

    await page.close();
    return {
        deps: urls,
        headers: response.headers(),
        redirects: redirects,
    };
};

export default collectData;
