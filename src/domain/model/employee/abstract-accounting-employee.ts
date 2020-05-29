import { AccountingEmployee } from "./accounting-employee";
import { Employee } from "./employee";

export abstract class AbstractAccountingEmployee extends Employee
  implements AccountingEmployee {
  /**
   * 給与を計算する
   * @return 給与金額
   */
  abstract calcSalary(): Promise<number>;
}
