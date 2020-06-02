export interface EvaluatePersonalUsecase {
  /**
   * 特定の従業員の人事考課を行う
   * @param employeeNumber 人事考課をする従業員の社員番号
   * @param fluctuation 等級の増減
   */
  execute(employeeNumber: string, fluctuation: number): Promise<void>;
}
