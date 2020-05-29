import { HumanResourceEmployee } from "./human-resource-employee";
import { Employee } from "./employee";

export abstract class AbstractHumanResourceEmployee extends Employee
  implements HumanResourceEmployee {
  /**
   * 人事考課を行う
   * @param fluctuation 等級の増減
   */
  evaluatePersonal(fluctuation: number): void {
    if (this._grade) {
      this._grade = this._grade + fluctuation;
    }
  }
}
