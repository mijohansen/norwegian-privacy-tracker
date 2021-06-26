import {HttpFunction} from "@google-cloud/functions-framework";
import {CrawlData, loadCrawlData, saveCrawlData} from "@privacy-tracker/storage";
import collectData from "./app/collect-data";
import isValidUrl from "./app/valid-url";


/**
 * Fetches and stores
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
export const collector: HttpFunction = async (req, res) => {
    const {url} = req.query
    if (isValidUrl(url)) {
        try {
            const urlObj = new URL(url as string)
            const now = new Date()
            const oldCrawlData = await loadCrawlData(now, urlObj);
            if (oldCrawlData) {
                console.log("Crawldata already exists.");
                res.send(oldCrawlData)
            } else {
                const data = await collectData(urlObj);
                const crawlData: CrawlData = {
                    date: now,
                    url: urlObj,
                    ...data
                }
                const result = await saveCrawlData(crawlData);
                console.log("saved crawldata for ", urlObj.toString(), "passed affected rows ", result.affectedRows)
                const newCrawlData = await loadCrawlData(now, urlObj);
                res.send(newCrawlData)
            }
        } catch (e: any) {
            console.error(e);
            res.status(500).send(e.message);
        }
    } else {
        res.status(400).send("Need param `url` to be set and a valid url");
    }
};
