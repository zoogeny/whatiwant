
import { formatCurrency } from "./formatter";

describe("#formatCurrency", () => {
    it("formats positive numbers", () => {
        expect(formatCurrency(12)).toBe("12");
        expect(formatCurrency(1000)).toBe("1,000");
        expect(formatCurrency(1000000)).toBe("1,000,000");
    });

    it("formats negative numbers", () => {
        expect(formatCurrency(-12)).toBe("-12");
        expect(formatCurrency(-1000)).toBe("-1,000");
        expect(formatCurrency(-1000000)).toBe("-1,000,000");
    });
});
