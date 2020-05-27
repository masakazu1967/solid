import { TaxPrice } from "./tax-price";

describe("TaxPrice", () => {
  describe("number", () => {
    it("単価1000円の品物5個の個数は5個である", () => {
      // given
      const price = new TaxPrice(1000, 5, 1.1);
      // when
      // then
      expect(price.number).toBe(5);
    });
  });
});
