import { Salary } from "../../../domain/model/salary/salary";
import { EmployeeRepository } from "../../../domain/model/employee/employee.repository";
import { SalaryRepository } from "../../../domain/model/salary/salary.repository";

/**
 * 特定の従業員の給与を計算して保存する
 */
export class CalcSalaryInteractor {
  constructor(
    private _employeeRepository: EmployeeRepository,
    private _salaryRepository: SalaryRepository
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
    const salary = new Salary(employee.id, employee.calcSalary());
    return this._salaryRepository.save(salary);
  }
}
