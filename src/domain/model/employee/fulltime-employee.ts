import { AbstractHumanResourceEmployee } from "./abstract-human-resource-employee";
import { AccountingEmployee } from "./accounting-employee";

/**
 * 正社員
 */
export class FulltimeEmployee extends AbstractHumanResourceEmployee
  implements AccountingEmployee {
  /**
   * 正社員オブジェクトを作成する。
   * @param employeeNumber 社員番号
   * @param employeeName 社員名
   * @param grade 等級
   * @param allowance 手当
   * @param deduction 天引き
   * @return 正社員
   */
  static create(
    employeeNumber: string,
    employeeName: string,
    grade: number,
    allowance: number,
    deduction: number
  ): FulltimeEmployee {
    const fulltimeEmployee = new FulltimeEmployee();
    fulltimeEmployee.genId();
    fulltimeEmployee._employeeNumber = employeeNumber;
    fulltimeEmployee._employeeName = employeeName;
    fulltimeEmployee._grade = grade;
    fulltimeEmployee._allowance = allowance;
    fulltimeEmployee._deduction = deduction;
    return fulltimeEmployee;
  }

  /**
   * 給与を計算する
   * @return 給与金額
   */
  calcSalary(): Promise<number> {
    // 正社員は基本給+手当-天引
    return Promise.resolve(this.basicSalary + this.allowance - this.deduction);
  }
}
