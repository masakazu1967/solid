/**
 * 金額
 */
export class Price {
  constructor(protected _price: number, protected _number: number) {}

  get price(): number {
    return this._price;
  }

  /**
   * 合計金額と単価から個数を割り出す
   */
  get number(): number {
    return this.getTotalPrice() / this.price;
  }

  /**
   * 合計金額を取得する
   */
  getTotalPrice(): number {
    return this._price * this._number;
  }
}
