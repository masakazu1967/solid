export interface AccountingEmployee {
  /**
   * 給与を計算する
   * @return 給与金額
   */
  calcSalary(): Promise<number>;
}
