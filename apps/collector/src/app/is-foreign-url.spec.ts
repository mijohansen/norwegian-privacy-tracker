import isForeignUrl from "./is-foreign-url";
import each from "jest-each";

describe("is-foreign", () => {
    each([
        ["http://www.example.com", "http://subdomain.example.com", false],
        ["http://www.example.com", "http://example.com", false],
        ["http://example.com", "http://subdomain.example.com", false],
        ["https://www.example.com", "http://subdomain.example.com", false],
        ["http://www.example.com", "https://example.com", false],
        ["https://example.com", "http://subdomain.example.com", false],
        ["http://www.example.com", "http://subdomain.evil.com", true],
        ["http://www.example.com", "http://evil.corp.com", true],
        ["http://example.com", "https://tracking.example.evil.com", true],
    ]).it("check if when on %s, %s is foreign", (a, b, expected) => {
        console.log({a, b, expected})
        expect(isForeignUrl(new URL(a), new URL(b))).toBe(expected)
    });

})
