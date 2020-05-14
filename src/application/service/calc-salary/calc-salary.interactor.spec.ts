import { CalcSalaryInteractor } from "./calc-salary.interactor";
import { Employee } from "../../../domain/model/employee/employee";
import { EmploymentSystem } from "../../../domain/model/employee/employment-system";
import { EmployeeRepository } from "../../../domain/model/employee/employee.repository";
import { SalaryRepository } from "../../../domain/model/salary/salary.repository";

describe("CalcSalaryInteractor", () => {
  let interactor: CalcSalaryInteractor;
  const employeeRepository = new EmployeeRepository();
  const salaryRepository = new SalaryRepository();
  beforeEach(async () => {
    interactor = new CalcSalaryInteractor(employeeRepository, salaryRepository);
    const employee = Employee.create(
      "00000001",
      "徳川家康",
      EmploymentSystem.FulltimeEmployee,
      10,
      5000,
      20000
    );
    await employeeRepository.save(employee);
  });
  describe("execute", () => {
    it("正社員の給与は基本給＋手当ー天引になっている", async () => {
      // given
      const employeeNumber = "00000001";
      // when
      interactor.execute(employeeNumber);
      // then
      const employee = await employeeRepository.findByEmployeeNumber(
        employeeNumber
      );
      if (!employee.id) {
        throw new Error("テストが正しくありません");
      }
      const amount =
        employee.basicSalary + employee.allowance - employee.deduction;
      const salary = await salaryRepository.findByEmployeeId(employee.id);
      expect(salary.amount).toBe(amount);
    });
  });
});
