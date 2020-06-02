import { Salary } from "./salary";

/**
 * 給与リポジトリ
 */
export interface SalaryRepository {
  /**
   * 指定した従業員IDの給与を取得する
   * @param employeeId 取得する給与の従業員ID
   */
  findByEmployeeId(employeeId: string): Promise<Salary>;

  /**
   * 指定した給与を保存する
   * @param salary 保存する給与
   */
  save(salary: Salary): Promise<void>;
}
