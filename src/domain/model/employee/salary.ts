/**
 * 給与クラス
 */
export class Salary {
  private static _salaries: { [key: string]: Salary } = {};
  constructor(private _employeeId: string, private _amount: number) {}

  get amount(): number {
    return this._amount;
  }

  findByEmployeeId(employeeId: string): Promise<void> {
    const salary = Salary._salaries[employeeId];
    if (!salary) {
      return Promise.reject(
        new Error(`従業員IDが${employeeId}の給与金額が見つかりません`)
      );
    }
    this._employeeId = salary._employeeId;
    this._amount = salary._amount;
    return Promise.resolve();
  }

  save(): Promise<void> {
    Salary._salaries[this._employeeId] = this;
    return Promise.resolve();
  }
}
