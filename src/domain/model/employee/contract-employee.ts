import { AbstractHumanResourceEmployee } from "./abstract-human-resource-employee";
import { AccountingEmployee } from "./accounting-employee";

/**
 * 契約社員
 */
export class ContractEmployee extends AbstractHumanResourceEmployee
  implements AccountingEmployee {
  /**
   * 契約社員オブジェクトを作成する。
   * @param employeeNumber 社員番号
   * @param employeeName 社員名
   * @param grade 等級
   * @param allowance 手当
   * @return 契約社員
   */
  static create(
    employeeNumber: string,
    employeeName: string,
    grade: number,
    allowance: number
  ): ContractEmployee {
    const contractEmployee = new ContractEmployee();
    contractEmployee.genId();
    contractEmployee._employeeNumber = employeeNumber;
    contractEmployee._employeeName = employeeName;
    contractEmployee._grade = grade;
    contractEmployee._allowance = allowance;
    return contractEmployee;
  }

  /**
   * 給与を計算する
   * @return 給与金額
   */
  calcSalary(): Promise<number> {
    // 契約社員は基本給+手当
    return Promise.resolve(this.basicSalary + this.allowance);
  }
}
