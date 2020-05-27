import { Price } from "./price";

/**
 * 税込価格
 */
export class TaxPrice {
  private _price: Price;
  constructor(price: number, number: number, private _rate: number) {
    this._price = new Price(price, number);
  }

  /**
   * 価格クラスの個数アクセッサに委譲する
   */
  get number(): number {
    return this._price.number;
  }

  /**
   * 消費税を付与した合計金額
   */
  getTaxIncludedTotalPrice(): number {
    return this._price.getTotalPrice() * this._rate;
  }
}
