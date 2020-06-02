import { Salary } from "../../../domain/model/salary/salary";
import { SalaryRepository } from "../../../domain/model/salary/salary.repository";

/**
 * インメモリ給与リポジトリ
 */
export class InMemorySalaryRepository implements SalaryRepository {
  private _salaries: { [key: string]: Salary } = {};

  /**
   * 指定した従業員IDの給与を取得する
   * @param employeeId 取得する給与の従業員ID
   */
  findByEmployeeId(employeeId: string): Promise<Salary> {
    const salary = this._salaries[employeeId];
    if (!salary) {
      return Promise.reject(
        new Error(`従業員IDが${employeeId}の給与金額が見つかりません`)
      );
    }
    return Promise.resolve(salary);
  }

  /**
   * 指定した給与を保存する
   * @param salary 保存する給与
   */
  save(salary: Salary): Promise<void> {
    this._salaries[salary.employeeId] = salary;
    return Promise.resolve();
  }
}
