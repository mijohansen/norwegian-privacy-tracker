import {fromDateToYearWeek} from "../utils/date-utils";
import {CrawlData, loadCrawlData, saveCrawlData} from "./crawls";
import {getDbConnection} from "@privacy-tracker/storage";


describe('crawls', () => {
    it('should work', () => {
        fromDateToYearWeek(new Date())
    });
    it("should save and retrive  data", async () => {
        const date = new Date(1600, 11, 29, 12);
        const url = new URL('https://nav.no/')
        const connection = await getDbConnection();

        // Sletter
        await connection.execute("DELETE FROM crawls WHERE week=?", [
            fromDateToYearWeek(date)
        ])

        const crawlData: CrawlData = {
            url,
            date,
            deps: [
                {
                    method: 'GET',
                    status: 200,
                    url: 'https://www.googletagmanager.com/gtm.js?id=GTM-PM9RP3&gtm_auth=&gtm_preview=&gtm_cookies_win=x',
                    data: null
                },
                {
                    method: 'GET',
                    status: 200,
                    url: 'https://account.psplugin.com/83BD7664-B38B-4EEE-8D99-200669A32551/ps.js',
                    data: null
                },
                {
                    method: 'GET',
                    status: 200,
                    url: 'https://static.hotjar.com/c/hotjar-118350.js?sv=6',
                    data: null
                },
                {
                    method: 'GET',
                    status: 200,
                    url: 'https://www.google-analytics.com/analytics.js',
                    data: null
                },
                {
                    method: 'POST',
                    status: 200,
                    url: 'https://nav.psplugin.com/api/v1/register/83bd7664-b38b-4eee-8d99-200669a32551?json=true',
                    data: '{"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/92.0.4512.0 Safari/537.36"}'
                },
                {
                    method: 'POST',
                    status: 200,
                    url: 'https://www.google-analytics.com/j/collect?v=1&_v=j91&aip=1&a=1227112734&t=pageview&_s=1&dl=https%3A%2F%2Fwww.nav.no%2Fno%2Fperson&ul=en-us&de=UTF-8&dt=Privatperson%20-%20nav.no&sd=24-bit&sr=3840x2160&vp=1200x1000&je=0&_u=YEBAAUADQAAAAC~&jid=1621364053&gjid=89225562&cid=1292401513.1624645481&tid=UA-9127381-16&_gid=188365311.1624645481&_r=1&gtm=2wg6n0PM9RP3&z=993908769',
                    data: null
                },
                {
                    method: 'GET',
                    status: 200,
                    url: 'https://www.google-analytics.com/gtm/js?id=GTM-5SGP5ZV&t=gtm6&cid=1292401513.1624645481&aip=true',
                    data: null
                },
                {
                    method: 'GET',
                    status: 204,
                    url: 'https://nav.psplugin.com/api/v1/session/bucket/visitor?json=true&sessionId=78e22d3c-3405-471b-b6cf-2404e431886a%2BQyxeqQlPEjoLYKjPixapyXsphYgYrEkDzkuouiF95M%3D',
                    data: null
                },
                {
                    method: 'GET',
                    status: 200,
                    url: 'https://nav.psplugin.com/api/v1/Group/Status/83bd7664-b38b-4eee-8d99-200669a32551?json=true&sessionId=78e22d3c-3405-471b-b6cf-2404e431886a%2BQyxeqQlPEjoLYKjPixapyXsphYgYrEkDzkuouiF95M%3D&groupId=D3F9B5D9-C9FD-43AD-BA23-6E112D23ABFC&groupId=975CAC35-8D3E-402C-B9E3-0930D30FFFB7&groupId=A034081B-6B73-46B7-BE27-23B8E9CE3079&groupId=10C7EB40-5C88-47D0-921B-6711F0BE3A35&groupId=17BF7E98-4CFC-4393-B818-88B2966F536D&groupId=284993C4-201A-44DD-8095-D894BA596995&groupId=2E0339C4-401B-4E6E-A150-B174C5C51566&groupId=401F1FBC-585C-4221-9322-682DBA257597&groupId=45AFEBF9-0978-4C00-876C-A0A103F0421E&groupId=586878F4-BFF0-4CA3-B11A-443CDDED6297&groupId=5A01CD31-4CE4-4A3E-98B8-3EEF1F027031&groupId=75056881-6BD2-4C7C-BE7B-D03BBC6EF931&groupId=9F74E039-1F22-4216-AB9D-AA94B9CB9640&groupId=A12622A4-3C84-48F6-B0D1-DCA8018A7B5D&groupId=A13C6D78-186D-49F9-BD2F-1B20C61D5272&groupId=A2C7054C-84F0-49B9-B839-C4BFC7DBFAA5&groupId=AC671286-3E38-4B96-AEC3-5801594E2E4E&groupId=B4AD46F1-0B03-4CFC-8F55-76127C6018E6&groupId=B956AD34-7C0C-4CCE-A2BA-C893824BD75F&groupId=EA2D80A2-DAED-4B7A-9662-04FFA5366A9E&groupId=F6DCD254-1BF2-4212-AA44-FA36F13DDC05&groupId=FDD3BE5F-3AC9-4937-99B9-A230111C633A&groupId=B6194602-E3F9-4FB3-9549-AF1161FC029C',
                    data: null
                },
                {
                    method: 'POST',
                    status: 200,
                    url: 'https://nav.psplugin.com/api/v1/Batch/?json=true&sessionId=78e22d3c-3405-471b-b6cf-2404e431886a%2BQyxeqQlPEjoLYKjPixapyXsphYgYrEkDzkuouiF95M%3D',
                    data: '{"items":[{"contentHeaders":{"Content-Type":"application/json"},"method":"post","uri":"api/v1/Tracking/Bundle","body":"[{\\"type\\":\\"Navigation\\",\\"url\\":\\"https://www.nav.no/no/person\\",\\"referrer\\":\\"\\",\\"visitId\\":\\"00000000-0000-0000-0000-000000000000\\",\\"siteId\\":\\"1F1046B2-16A5-40A1-AD72-65B34BA29159\\",\\"metaData\\":[{\\"property\\":\\"triggerType\\",\\"content\\":\\"pageload\\"}]},{\\"type\\":\\"Opportunity\\",\\"visitId\\":\\"00000000-0000-0000-0000-000000000000\\",\\"siteId\\":\\"1F1046B2-16A5-40A1-AD72-65B34BA29159\\",\\"opportunityId\\":\\"615FF5E7-37B7-4697-A35F-72598B0DC53B\\",\\"correlationId\\":\\"4F4E804B-9618-4124-B659-6A9A18BD0E02\\",\\"tags\\":[],\\"source\\":\\"visitor\\",\\"tag\\":{},\\"score\\":0},{\\"type\\":\\"Solution\\",\\"visitId\\":\\"00000000-0000-0000-0000-000000000000\\",\\"solutionId\\":\\"5EB316A1-11E2-460A-B4E3-F82DBD13E21D\\",\\"siteId\\":\\"1F1046B2-16A5-40A1-AD72-65B34BA29159\\",\\"opportunityId\\":\\"615FF5E7-37B7-4697-A35F-72598B0DC53B\\",\\"correlationId\\":\\"4F4E804B-9618-4124-B659-6A9A18BD0E02\\",\\"eventName\\":\\"Evaluated\\",\\"tags\\":[],\\"source\\":\\"visitor\\",\\"tag\\":{}},{\\"type\\":\\"Solution\\",\\"visitId\\":\\"00000000-0000-0000-0000-000000000000\\",\\"solutionId\\":\\"0B4DC0E2-D0C9-4106-9C4E-E12AC0A8126B\\",\\"siteId\\":\\"1F1046B2-16A5-40A1-AD72-65B34BA29159\\",\\"opportunityId\\":\\"615FF5E7-37B7-4697-A35F-72598B0DC53B\\",\\"correlationId\\":\\"4F4E804B-9618-4124-B659-6A9A18BD0E02\\",\\"eventName\\":\\"Evaluated\\",\\"tags\\":[],\\"source\\":\\"visitor\\",\\"tag\\":{}},{\\"type\\":\\"Solution\\",\\"visitId\\":\\"00000000-0000-0000-0000-000000000000\\",\\"solutionId\\":\\"2F32813B-5CC1-45B4-92FF-51126F683BE2\\",\\"siteId\\":\\"1F1046B2-16A5-40A1-AD72-65B34BA29159\\",\\"opportunityId\\":\\"615FF5E7-37B7-4697-A35F-72598B0DC53B\\",\\"correlationId\\":\\"4F4E804B-9618-4124-B659-6A9A18BD0E02\\",\\"eventName\\":\\"Evaluated\\",\\"tags\\":[],\\"source\\":\\"visitor\\",\\"tag\\":{}}]"}]}'
                }

            ],
            headers: {
                'cache-control': 's-maxage=1, stale-while-revalidate',
                'content-type': 'text/html; charset=utf-8',
                date: 'Fri, 25 Jun 2021 18:24:40 GMT',
                etag: '"fd91-c9uu6IsdopSESL9+4/EuUTZhca8"',
                'permissions-policy': 'interest-cohort=()',
                vary: 'Accept-Encoding',
                'x-powered-by': 'Next.js',
                'x-ua-compatible': 'IE=Edge',
                'strict-transport-security': 'max-age=31536000; includeSubDomains',
                'x-content-type-options': 'nosniff',
                'x-frame-options': 'SAMEORIGIN',
                'x-xss-protection': '1; mode=block',
                'content-encoding': 'gzip',
                'content-length': '14550',
                connection: 'Keep-Alive'
            },
            redirects: [
                {status: 302, url: 'https://nav.no/'},
                {status: 302, url: 'https://www.nav.no/'},
                {status: 307, url: 'https://www.nav.no/Forsiden'},
                {status: 200, url: 'https://www.nav.no/no/person'}
            ]
        };

        const result = await saveCrawlData(crawlData);
        expect(result.affectedRows).toBe(1)

        // loader data igjen
        const data = await loadCrawlData(date, url);
        await connection.end();
        expect(data.week).toBe(fromDateToYearWeek(date))
    });
});
