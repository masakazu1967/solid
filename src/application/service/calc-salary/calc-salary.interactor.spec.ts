import "reflect-metadata";
import { CalcSalaryInteractor } from "./calc-salary.interactor";
import { EmploymentSystem } from "../../../domain/model/employee/employment-system";
import { Manhour } from "../../../domain/model/manhour/manhour";
import { AccountingEmployeeFactory } from "../../../domain/model/employee/accounting-employee.factory";
import { InMemoryAccountingEmployeeRepository } from "../../../interface/datasource/memory/inmemory-accounting-employee.repository";
import { InMemoryManhourRepository } from "../../../interface/datasource/memory/inmemory-manhour.repository";
import { InMemorySalaryRepository } from "../../../interface/datasource/memory/inmemory-salary.repository";

describe("CalcSalaryInteractor", () => {
  let interactor: CalcSalaryInteractor;
  const employeeRepository = new InMemoryAccountingEmployeeRepository();
  const salaryRepository = new InMemorySalaryRepository();
  const manhourRepository = new InMemoryManhourRepository();
  const fulltimeEmployeeNumber = "00000001";
  const contractEmployeeNumber = "00000002";
  const parttimeEmployeeNumber = "00000003";
  const parttimeManhour = 80;

  beforeEach(async () => {
    interactor = new CalcSalaryInteractor(employeeRepository, salaryRepository);
    const employeeProps = [
      {
        employeeNumber: fulltimeEmployeeNumber,
        employeeName: "徳川家康",
        employmentSystem: EmploymentSystem.FulltimeEmployee,
        grade: 10,
        allowance: 5000,
        deduction: 20000,
      },
      {
        employeeNumber: contractEmployeeNumber,
        employeeName: "徳川秀忠",
        employmentSystem: EmploymentSystem.ContractEmployee,
        grade: 6,
        allowance: 4000,
        deduction: 1000,
      },
      {
        employeeNumber: parttimeEmployeeNumber,
        employeeName: "徳川家光",
        employmentSystem: EmploymentSystem.ParttimeEmployee,
        grade: 0,
        allowance: 2000,
        deduction: 1000,
      },
    ];
    await manhourRepository.save(
      new Manhour(parttimeEmployeeNumber, parttimeManhour)
    );
    const employeeFactory = new AccountingEmployeeFactory(manhourRepository);
    await Promise.all(
      employeeProps.map((employeeProp) => {
        const employee = employeeFactory.create(
          employeeProp.employeeNumber,
          employeeProp.employeeName,
          employeeProp.employmentSystem,
          employeeProp.grade,
          employeeProp.allowance,
          employeeProp.deduction
        );
        return employeeRepository.save(employee);
      })
    );
  });
  describe("execute", () => {
    it("正社員の給与は基本給＋手当－天引になっている", async () => {
      // given
      const employeeNumber = fulltimeEmployeeNumber;
      // when
      await interactor.execute(employeeNumber);
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
    it("契約社員の給与は基本給＋手当になっている", async () => {
      // given
      const employeeNumber = contractEmployeeNumber;
      // when
      await interactor.execute(employeeNumber);
      // then
      const employee = await employeeRepository.findByEmployeeNumber(
        employeeNumber
      );
      if (!employee.id) {
        throw new Error("テストが正しくありません");
      }
      const amount = employee.basicSalary + employee.allowance;
      const salary = await salaryRepository.findByEmployeeId(employee.id);
      expect(salary.amount).toBe(amount);
    });
    it("パート社員の給与は時給×労働時間＋手当になっている", async () => {
      // given
      const employeeNumber = parttimeEmployeeNumber;
      const wage = 800;
      // when
      await interactor.execute(employeeNumber);
      // then
      const employee = await employeeRepository.findByEmployeeNumber(
        employeeNumber
      );
      if (!employee.id) {
        throw new Error("テストが正しくありません");
      }
      const manhour = await manhourRepository.findByEmployeeId(employee.id);
      const amount = manhour.manhour * wage + employee.allowance;
      const salary = await salaryRepository.findByEmployeeId(employee.id);
      expect(salary.amount).toBe(amount);
    });
  });
});
