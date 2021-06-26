const isForeignUrl = (pageUrl: URL, url: URL): boolean => {
    const [tld, host] = pageUrl.hostname.split(".").reverse()
    const domain = [host, tld].join(".");
    return !url.hostname.endsWith(domain) && url.protocol.startsWith("http")
}

export default isForeignUrl
