import {insertIgnore} from "./sql";
import {checkConnection} from "@privacy-tracker/storage";

describe('crawls', () => {

    it('should work', () => {
        const aValue = "sdfgasdfsadfsadfsa";
        const [statement,values] = insertIgnore("my-table", {
            somefiled: "with data",
            another: aValue
        })
        expect(statement.startsWith("INSERT IGNORE")).toBeTruthy()
        expect(values.length).toBe(2)
        expect(statement).toContain("my-table");
        expect(values[1]).toBe(aValue)
    });

    it('should check connection', async () => {
        const checked = await checkConnection();
        console.log(checked)
    });
});
