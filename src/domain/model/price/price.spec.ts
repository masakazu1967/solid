import { Price } from "./price";

describe("Price", () => {
  describe("number", () => {
    it("単価1000円の品物5個の個数は5個である", () => {
      // given
      const price = new Price(1000, 5);
      // when
      // then
      expect(price.number).toBe(5);
    });
  });
});
