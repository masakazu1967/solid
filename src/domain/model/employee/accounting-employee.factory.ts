import { EmploymentSystem } from "./employment-system";
import { FulltimeEmployee } from "./fulltime-employee";
import { ContractEmployee } from "./contract-employee";
import { ManhourRepository } from "../manhour/manhour.repository";
import { ParttimeEmployee } from "./parttime-employee";
import { AbstractAccountingEmployee } from "./abstract-accounting-employee";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../types";

/**
 * 社員ファクトリ
 */
@injectable()
export class AccountingEmployeeFactory {
  constructor(
    @inject(TYPES.ManhourRepository)
    private _manhourRepository: ManhourRepository
  ) {}

  /**
   * 雇用形態に応じた社員を生成する。
   * @param employeeNumber 社員番号
   * @param employeeName 社員名
   * @param employmentSystem 雇用形態
   * @param grade 等級
   * @param allowance 手当
   * @param deduction 天引き
   * @returns 生成した社員
   */
  create(
    employeeNumber: string,
    employeeName: string,
    employmentSystem: EmploymentSystem,
    grade: number,
    allowance: number,
    deduction: number
  ): AbstractAccountingEmployee {
    let employee: AbstractAccountingEmployee;
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
      case EmploymentSystem.ParttimeEmployee:
        employee = ParttimeEmployee.create(
          this._manhourRepository,
          employeeNumber,
          employeeName,
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
