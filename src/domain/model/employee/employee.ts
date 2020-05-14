import { v4 as uuid } from "uuid";
import { EmploymentSystem } from "./employment-system";

export class Employee {
  private _id: string | undefined; // ID
  private _employeeNumber: string | undefined; // 社員番号
  private _employeeName: string | undefined; // 社員名称
  private _grade: number | undefined; // 等級
  private _allowance = 0; // 手当
  private _basicSalary = 0; // 基本給
  private _deduction = 0; // 天引き
  private _employmentSystem: EmploymentSystem =
    EmploymentSystem.FulltimeEmployee; // 正社員
  private static _employees: { [key: string]: Employee } = {};

  /**
   * 従業員を新規に作成する。
   * 更新する場合はこのメソッドを利用せずインスタンスを作成してからfindByEmployeeNumberを利用すること。
   * @param employeeNumber 社員番号
   * @param employeeName 社員名称
   * @param employmentSystem 雇用形態
   * @param grade 等級
   * @param allowance 手当
   * @param deduction 天引き
   */
  static create(
    employeeNumber: string,
    employeeName: string,
    employmentSystem: EmploymentSystem,
    grade: number,
    allowance: number,
    deduction: number
  ): Employee {
    const employee = new Employee();
    employee._id = uuid();
    employee._employeeNumber = employeeNumber;
    employee._employeeName = employeeName;
    employee._employmentSystem = employmentSystem;
    employee._grade = grade;
    employee._allowance = allowance;
    employee._deduction = deduction;
    return employee;
  }

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

  get employmentSystem(): EmploymentSystem {
    return this._employmentSystem;
  }

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
