import { Employee } from "../../../domain/model/employee/employee";
import { EmploymentSystem } from "../../../domain/model/employee/employment-system";
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
    const salary = new Salary(employee.id, this.calcSalary(employee));
    return this._salaryRepository.save(salary);
  }

  /**
   * 特定の従業員の給与を計算する
   * @param employee 給与を計算する従業員
   */
  private calcSalary(employee: Employee): number {
    let salary = 0;
    if (employee.employmentSystem === EmploymentSystem.FulltimeEmployee) {
      // 正社員は基本給+手当-天引
      salary = employee.basicSalary + employee.allowance - employee.deduction;
    }
    if (employee.employmentSystem === EmploymentSystem.ContractEmployee) {
      // 契約社員は基本給+手当
      salary = employee.basicSalary + employee.allowance;
    }
    return salary;
  }
}
