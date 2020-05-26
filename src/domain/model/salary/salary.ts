/**
 * 給与クラス
 */
export class Salary {
  constructor(private _employeeId: string, private _amount: number) {}

  /**
   * 従業員ID
   */
  get employeeId(): string {
    return this._employeeId;
  }

  /**
   * 給与金額
   */
  get amount(): number {
    return this._amount;
  }
}
