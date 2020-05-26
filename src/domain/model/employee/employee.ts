import { v4 as uuid } from "uuid";

/**
 * 従業員の抽象クラス
 */
export abstract class Employee {
  protected _id: string | undefined; // ID
  protected _employeeNumber: string | undefined; // 社員番号
  protected _employeeName: string | undefined; // 社員名称
  protected _grade: number | undefined; // 等級
  protected _allowance = 0; // 手当
  protected _basicSalary = 0; // 基本給
  protected _deduction = 0; // 天引き

  get id(): string | undefined {
    return this._id;
  }

  get employeeNumber(): string | undefined {
    return this._employeeNumber;
  }

  get grade(): number | undefined {
    return this._grade;
  }

  /**
   * 基本給
   * @return 基本給を返す。
   */
  get basicSalary(): number {
    if (!this._grade) {
      return 0;
    }
    return this._grade * 40000;
  }

  get allowance(): number {
    return this._allowance;
  }

  get deduction(): number {
    return this._deduction;
  }

  /**
   * IDを生成する。
   */
  protected genId(): void {
    this._id = uuid();
  }

  /**
   * 給与を計算する
   * @return 給与金額
   */
  abstract calcSalary(): Promise<number>;

  /**
   * 人事考課を行う
   * @param fluctuation 等級の増減
   */
  evaluatePersonal(fluctuation: number): void {
    if (this._grade) {
      this._grade = this._grade + fluctuation;
    }
  }
}
