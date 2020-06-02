import { HumanResourceEmployeeRepository } from "../../../domain/model/employee/human-resource-employee.repository";
import { EvaluatePersonalUsecase } from "./evaluate-personal.usecase";

/**
 * 人事考課ユースケース
 */
export class EvaluatePersonInteractor implements EvaluatePersonalUsecase {
  constructor(private _employeeRepository: HumanResourceEmployeeRepository) {}
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
