import { Price } from "./price";

/**
 * 税込価格
 */
export class TaxPrice extends Price {
  constructor(price: number, number: number, private _rate: number) {
    super(price, number);
  }

  /**
   * 合計金額を取得する
   */
  getTotalPrice(): number {
    return this.price * this._number * this._rate;
  }
}
