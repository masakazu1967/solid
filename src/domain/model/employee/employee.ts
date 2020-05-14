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

  /**
   * 指定した社員番号の従業員を取得する
   * @param employeeNumber 社員番号
   */
  findByEmployeeNumber(employeeNumber: string): Promise<void> {
    const employee = Employee._employees[employeeNumber];
    if (!employee) {
      return Promise.reject(
        new Error(`${employeeNumber}の従業員が存在しません`)
      );
    }
    this._id = employee._id;
    this._employeeNumber = employee._employeeNumber;
    this._employeeName = employee._employeeName;
    this._grade = employee._grade;
    this._employmentSystem = employee._employmentSystem;
    this._basicSalary = employee._basicSalary;
    this._allowance = employee._allowance;
    this._deduction = employee._deduction;
    return Promise.resolve();
  }

  /**
   * 従業員を保存する
   */
  save(): Promise<void> {
    if (this._employeeNumber) {
      Employee._employees[this._employeeNumber] = this;
    }
    return Promise.resolve();
  }
}
