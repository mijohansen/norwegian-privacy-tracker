
import {fromDateToYearWeek} from "./date-utils";

describe('storage', () => {
    it('should work', () => {
        const week = fromDateToYearWeek(new Date())
        expect((week+"").length).toBe(6);
    });
});
