/**
 * 給与クラス
 */
export class Salary {
  private static _salaries: { [key: string]: Salary } = {};
  constructor(private _employeeId: string, private _amount: number) {}

  get employeeId(): string {
    return this._employeeId;
  }

  get amount(): number {
    return this._amount;
  }
}
