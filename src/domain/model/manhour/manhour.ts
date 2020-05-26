/**
 * 工数
 */
export class Manhour {
  constructor(private _employeeId: string, private _manhour: number) {}

  /**
   * 従業員ID
   */
  get employeeId(): string {
    return this._employeeId;
  }

  /**
   * 作業時間
   */
  get manhour(): number {
    return this._manhour;
  }
}
