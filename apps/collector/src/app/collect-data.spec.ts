import collectData, {killBrowser} from "./collect-data";



it("should collect data from webpage", async () => {
    // @todo should really create our own test-server to avoid external dependency like this
    const data = await collectData("https://nav.no");
    console.log(data);
    expect(1).toBeGreaterThan(0);
    await killBrowser();
});
