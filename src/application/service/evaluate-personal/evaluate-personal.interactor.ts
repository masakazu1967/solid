import { EmployeeRepository } from "../../../domain/model/employee/employee.repository";

/**
 * 人事考課ユースケース
 */
export class EvaluatePersonInteractor {
  constructor(private _employeeRepository: EmployeeRepository) {}
  /**
   * 特定の従業員の人事考課を行う
   * @param employeeNumber 人事考課をする従業員の社員番号
   * @param fluctuation 等級の増減
   */
  async execute(employeeNumber: string, fluctuation: number): Promise<void> {
    const employee = await this._employeeRepository.findByEmployeeNumber(
      employeeNumber
    );
    employee.evaluatePersonal(fluctuation);
    return this._employeeRepository.save(employee);
  }
}
