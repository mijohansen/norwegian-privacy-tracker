import {fromDateToYearWeek} from "../utils/date-utils";
import {insertIgnore} from "../utils/sql";
import {getDbConnection} from "@privacy-tracker/storage";
import {ResultSetHeader} from "mysql2/promise";

export type CrawlData = {
    date: Date,
    url: URL,
    headers: {}
    deps: ResponseData[]
    redirects: ResponseData[]
}
export type StoredCrawlData = {
    week: number,
    url: URL,
    headers: {}
    deps: ResponseData[]
    redirects: ResponseData[]
    domain: string,
    created: Date,
}
export interface ResponseData {
    url: string,
    status: number,
    method?: string,
    data?: string,
}

function getDomainFromUrl(url: URL) {
    const [tld, host] = url.hostname.split(".").reverse()
    return [host, tld].join(".");
}

export async function loadCrawlData(date: Date, url: URL): Promise<StoredCrawlData> {
    const connection = await getDbConnection();
    const [rows] = await connection.execute("SELECT * FROM crawls WHERE week=? AND url=? LIMIT 1", [
        fromDateToYearWeek(date),
        url.toString()
    ])
    if(rows[0]){
        return {
            week: rows[0].week,
            url: new URL(rows[0].url),
            headers: JSON.parse(rows[0].headers),
            deps: JSON.parse(rows[0].deps),
            redirects: JSON.parse(rows[0].redirects),
            domain: rows[0].domain,
            created: new Date(rows[0].created),
        }
    } else {
        return null;
    }

}

export function crawlDataToSQL(crawlData: CrawlData): [string, any[]] {
    const obj = {
        week: fromDateToYearWeek(crawlData.date),
        url: crawlData.url.toString(),
        headers: JSON.stringify(crawlData.headers),
        deps: JSON.stringify(crawlData.deps),
        redirects: JSON.stringify(crawlData.redirects),
        domain: getDomainFromUrl(crawlData.url),
    }
    return insertIgnore("crawls", obj);
}

export async function saveCrawlData(crawlData: CrawlData): Promise<ResultSetHeader> {
    const connection = await getDbConnection();
    const [statement, values] = crawlDataToSQL(crawlData);
    const [results, buff] = await connection.execute(statement, values);
    return results as ResultSetHeader;
}
