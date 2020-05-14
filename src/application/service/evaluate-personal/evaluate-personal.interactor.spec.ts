import { EvaluatePersonInteractor } from "./evaluate-personal.interactor";
import { Employee } from "../../../domain/model/employee/employee";
import { EmploymentSystem } from "../../../domain/model/employee/employment-system";
import { EmployeeRepository } from "../../../domain/model/employee/employee.repository";

describe("EvaluatePersonalInteractor", () => {
  let interactor: EvaluatePersonInteractor;
  const employeeRepository = new EmployeeRepository();
  beforeEach(async () => {
    interactor = new EvaluatePersonInteractor(employeeRepository);
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
    it("正社員が人事考課を受けて+2される", async () => {
      // given
      const employeeNumber = "00000001";
      // when
      await interactor.execute(employeeNumber, 2);
      // then
      const employee = await employeeRepository.findByEmployeeNumber(
        employeeNumber
      );
      expect(employee.grade).toBe(12);
    });
    it("正社員が人事考課を受けて-1される", async () => {
      // given
      const employeeNumber = "00000001";
      // when
      await interactor.execute(employeeNumber, -1);
      // then
      const employee = await employeeRepository.findByEmployeeNumber(
        employeeNumber
      );
      expect(employee.grade).toBe(9);
    });
  });
});
