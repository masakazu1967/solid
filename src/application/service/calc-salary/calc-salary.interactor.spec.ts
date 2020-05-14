import { CalcSalaryInteractor } from "./calc-salary.interactor";
import { Employee } from "../../../domain/model/employee/employee";
import { Salary } from "../../../domain/model/employee/salary";
import { EmploymentSystem } from "../../../domain/model/employee/employment-system";

describe("CalcSalaryInteractor", () => {
  let interactor: CalcSalaryInteractor;
  beforeEach(async () => {
    interactor = new CalcSalaryInteractor();
    const employee = Employee.create(
      "00000001",
      "徳川家康",
      EmploymentSystem.FulltimeEmployee,
      10,
      5000,
      20000
    );
    await employee.save();
  });
  describe("execute", () => {
    it("正社員の給与は基本給＋手当ー天引になっている", async () => {
      // given
      const employeeNumber = "00000001";
      // when
      interactor.execute(employeeNumber);
      // then
      const employee = new Employee();
      await employee.findByEmployeeNumber(employeeNumber);
      if (!employee.id) {
        throw new Error("テストが正しくありません");
      }
      const amount =
        employee.basicSalary + employee.allowance - employee.deduction;
      const salary = new Salary("", 0);
      await salary.findByEmployeeId(employee.id);
      expect(salary.amount).toBe(amount);
    });
  });
});
