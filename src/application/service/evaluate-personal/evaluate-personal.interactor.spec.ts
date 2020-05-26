import { EvaluatePersonInteractor } from "./evaluate-personal.interactor";
import { EmploymentSystem } from "../../../domain/model/employee/employment-system";
import { EmployeeRepository } from "../../../domain/model/employee/employee.repository";
import { EmployeeFactory } from "../../../domain/model/employee/employee.factory";
import { ManhourRepository } from "../../../domain/model/manhour/manhour.repository";

describe("EvaluatePersonalInteractor", () => {
  let interactor: EvaluatePersonInteractor;
  const employeeRepository = new EmployeeRepository();
  const manhourRepository = new ManhourRepository();
  const fulltimeEmployeeNumber = "00000001";
  const grade = 10;
  beforeEach(async () => {
    interactor = new EvaluatePersonInteractor(employeeRepository);
    const employeeFactory = new EmployeeFactory(manhourRepository);
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
