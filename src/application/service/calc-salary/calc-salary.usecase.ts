export interface CalcSalaryUsecase {
  /**
   * 特定の従業員の給与を計算して保存する
   * @param employeeNumber 給与を計算する従業員の社員番号
   */
  execute(employeeNumber: string): Promise<void>;
}
