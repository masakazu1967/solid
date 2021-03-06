import { Salary } from "../../../domain/model/salary/salary";
import { SalaryRepository } from "../../../domain/model/salary/salary.repository";
import { AccountingEmployeeRepository } from "../../../domain/model/employee/accounting-employee.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../types";
import { CalcSalaryUsecase } from "./calc-salary.usecase";

/**
 * 特定の従業員の給与を計算して保存する
 */
@injectable()
export class CalcSalaryInteractor implements CalcSalaryUsecase {
  constructor(
    @inject(TYPES.AccountingEmployeeRepository)
    private _employeeRepository: AccountingEmployeeRepository,
    @inject(TYPES.SalaryRepository) private _salaryRepository: SalaryRepository
  ) {}

  /**
   * 特定の従業員の給与を計算して保存する
   * @param employeeNumber 給与を計算する従業員の社員番号
   */
  async execute(employeeNumber: string): Promise<void> {
    const employee = await this._employeeRepository.findByEmployeeNumber(
      employeeNumber
    );
    if (!employee.id) {
      return Promise.reject(
        new Error(`${employeeNumber}の従業員が存在しません`)
      );
    }
    const salary = new Salary(employee.id, await employee.calcSalary());
    return this._salaryRepository.save(salary);
  }
}
