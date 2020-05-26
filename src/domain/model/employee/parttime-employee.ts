import { Employee } from "./employee";
import { ManhourRepository } from "../manhour/manhour.repository";

/**
 * パート社員
 */
export class ParttimeEmployee extends Employee {
  private _WAGE = 800; // 時給
  constructor(private _manhourRepository: ManhourRepository) {
    super();
  }

  /**
   * パート社員オブジェクトを作成する。
   * @param manhourRepository 作業時間リポジトリ
   * @param employeeNumber 社員番号
   * @param employeeName 社員名
   * @param allowance 手当
   * @return パート社員
   */
  static create(
    manhourRepository: ManhourRepository,
    employeeNumber: string,
    employeeName: string,
    allowance: number
  ): ParttimeEmployee {
    const parttimeEmployee = new ParttimeEmployee(manhourRepository);
    parttimeEmployee.genId();
    parttimeEmployee._employeeNumber = employeeNumber;
    parttimeEmployee._employeeName = employeeName;
    parttimeEmployee._allowance = allowance;
    return parttimeEmployee;
  }

  /**
   * 作業時間を取得する。
   * @return 作業時間
   */
  private async _findManhour(): Promise<number> {
    let manhour = 0;
    if (this._id) {
      const mh = await this._manhourRepository.findByEmployeeId(this._id);
      manhour = mh.manhour;
    }
    return manhour;
  }

  /**
   * 給与を計算する
   * @return 給与金額
   */
  async calcSalary(): Promise<number> {
    // パート社員は時給×作業時間＋手当
    const manhour = await this._findManhour();
    return this._WAGE * manhour + this.allowance;
  }
}
