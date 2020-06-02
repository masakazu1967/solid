import { AbstractAccountingEmployee } from "./abstract-accounting-employee";

/**
 * 経理用従業員リポジトリ
 */
export interface AccountingEmployeeRepository {
  /**
   * 指定した社員番号の従業員を取得する
   * @param employeeNumber 取得する従業員の社員番号
   * @return 指定した社員番号の従業員
   */
  findByEmployeeNumber(
    employeeNumber: string
  ): Promise<AbstractAccountingEmployee>;

  /**
   * 従業員を保存する
   * @param employee 保存する従業員
   */
  save(employee: AbstractAccountingEmployee): Promise<void>;
}
