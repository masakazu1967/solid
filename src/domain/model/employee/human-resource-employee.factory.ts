import { EmploymentSystem } from "./employment-system";
import { FulltimeEmployee } from "./fulltime-employee";
import { ContractEmployee } from "./contract-employee";
import { AbstractHumanResourceEmployee } from "./abstract-human-resource-employee";

/**
 * 人事用従業員ファクトリ
 */
export class HumanResourceEmployeeFactory {
  /**
   * 雇用形態に応じた従業員を生成する。
   * @param employeeNumber 社員番号
   * @param employeeName 社員名
   * @param employmentSystem 雇用形態
   * @param grade 等級
   * @param allowance 手当
   * @param deduction 天引き
   * @returns 生成した従業員
   */
  create(
    employeeNumber: string,
    employeeName: string,
    employmentSystem: EmploymentSystem,
    grade: number,
    allowance: number,
    deduction: number
  ): AbstractHumanResourceEmployee {
    let employee: AbstractHumanResourceEmployee;
    switch (employmentSystem) {
      case EmploymentSystem.FulltimeEmployee:
        employee = FulltimeEmployee.create(
          employeeNumber,
          employeeName,
          grade,
          allowance,
          deduction
        );
        break;
      case EmploymentSystem.ContractEmployee:
        employee = ContractEmployee.create(
          employeeNumber,
          employeeName,
          grade,
          allowance
        );
        break;
      default:
        employee = FulltimeEmployee.create(
          employeeNumber,
          employeeName,
          grade,
          allowance,
          deduction
        );
    }
    return employee;
  }
}
