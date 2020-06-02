import { Manhour } from "../../../domain/model/manhour/manhour";
import { ManhourRepository } from "../../../domain/model/manhour/manhour.repository";
import { injectable } from "inversify";

/**
 * インメモリ作業時間リポジトリ
 */
@injectable()
export class InMemoryManhourRepository implements ManhourRepository {
  private _manhours: { [key: string]: Manhour } = {};

  /**
   * 指定した従業員IDの月の工数を取得する
   * @param employeeId 取得する工数の従業員ID
   * @return 指定した従業員IDの月の工数
   */
  findByEmployeeId(employeeId: string): Promise<Manhour> {
    const manhour = this._manhours[employeeId];
    if (!manhour) {
      return Promise.resolve(new Manhour(employeeId, 0));
    }
    return Promise.resolve(manhour);
  }

  /**
   * 指定した工数を保存する
   * @param manhour 保存する工数
   */
  save(manhour: Manhour): Promise<void> {
    this._manhours[manhour.employeeId] = manhour;
    return Promise.resolve();
  }
}
