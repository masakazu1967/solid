import "reflect-metadata";
import { EvaluatePersonInteractor } from "./evaluate-personal.interactor";
import { EmploymentSystem } from "../../../domain/model/employee/employment-system";
import { HumanResourceEmployeeFactory } from "../../../domain/model/employee/human-resource-employee.factory";
import { InMemoryHumanResourceEmployeeRepository } from "../../../interface/datasource/memory/inmemory-human-resource-employee.repository";

describe("EvaluatePersonalInteractor", () => {
  let interactor: EvaluatePersonInteractor;
  const employeeRepository = new InMemoryHumanResourceEmployeeRepository();
  const fulltimeEmployeeNumber = "00000001";
  const grade = 10;
  beforeEach(async () => {
    interactor = new EvaluatePersonInteractor(employeeRepository);
    const employeeFactory = new HumanResourceEmployeeFactory();
    const employee = employeeFactory.create(
      fulltimeEmployeeNumber,
      "徳川家康",
      EmploymentSystem.FulltimeEmployee,
      grade,
      5000,
      20000
    );
    await employeeRepository.save(employee);
  });
  describe("execute", () => {
    it("正社員が人事考課を受けて+2される", async () => {
      // given
      const employeeNumber = fulltimeEmployeeNumber;
      const fluctuation = 2;
      // when
      await interactor.execute(employeeNumber, fluctuation);
      // then
      const employee = await employeeRepository.findByEmployeeNumber(
        employeeNumber
      );
      expect(employee.grade).toBe(grade + fluctuation);
    });
    it("正社員が人事考課を受けて-1される", async () => {
      // given
      const employeeNumber = fulltimeEmployeeNumber;
      const fluctuation = -1;
      // when
      await interactor.execute(employeeNumber, fluctuation);
      // then
      const employee = await employeeRepository.findByEmployeeNumber(
        employeeNumber
      );
      expect(employee.grade).toBe(grade + fluctuation);
    });
  });
});
