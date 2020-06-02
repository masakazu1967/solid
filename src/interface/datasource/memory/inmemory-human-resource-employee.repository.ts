import { injectable } from "inversify";
import { AbstractHumanResourceEmployee } from "../../../domain/model/employee/abstract-human-resource-employee";
import { HumanResourceEmployeeRepository } from "../../../domain/model/employee/human-resource-employee.repository";

/**
 * 人事用インメモリ従業員リポジトリ
 */
@injectable()
export class InMemoryHumanResourceEmployeeRepository
  implements HumanResourceEmployeeRepository {
  private _employees: { [key: string]: AbstractHumanResourceEmployee } = {};

  /**
   * 指定した社員番号の従業員を取得する
   * @param employeeNumber 取得する従業員の社員番号
   * @return 指定した社員番号の従業員
   */
  findByEmployeeNumber(
    employeeNumber: string
  ): Promise<AbstractHumanResourceEmployee> {
    const employee = this._employees[employeeNumber];
    if (!employee) {
      return Promise.reject(
        new Error(`社員番号 ${employeeNumber} の従業員は存在しません`)
      );
    }
    return Promise.resolve(employee);
  }

  /**
   * 従業員を保存する
   * @param employee 保存する従業員
   */
  save(employee: AbstractHumanResourceEmployee): Promise<void> {
    if (!employee.employeeNumber) {
      return Promise.reject(new Error("社員番号が設定されていません"));
    }
    this._employees[employee.employeeNumber] = employee;
    return Promise.resolve();
  }
}
