import { Manhour } from "./manhour";

/**
 * 作業時間リポジトリ
 */
export interface ManhourRepository {
  /**
   * 指定した従業員IDの月の工数を取得する
   * @param employeeId 取得する工数の従業員ID
   * @return 指定した従業員IDの月の工数
   */
  findByEmployeeId(employeeId: string): Promise<Manhour>;

  /**
   * 指定した工数を保存する
   * @param manhour 保存する工数
   */
  save(manhour: Manhour): Promise<void>;
}
