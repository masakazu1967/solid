import { Container } from "inversify";
import { AccountingEmployeeRepository } from "./domain/model/employee/accounting-employee.repository";
import { TYPES } from "./types";
import { InMemoryAccountingEmployeeRepository } from "./interface/datasource/memory/inmemory-accounting-employee.repository";
import { HumanResourceEmployeeRepository } from "./domain/model/employee/human-resource-employee.repository";
import { InMemoryHumanResourceEmployeeRepository } from "./interface/datasource/memory/inmemory-human-resource-employee.repository";
import { ManhourRepository } from "./domain/model/manhour/manhour.repository";
import { InMemoryManhourRepository } from "./interface/datasource/memory/inmemory-manhour.repository";
import { SalaryRepository } from "./domain/model/salary/salary.repository";
import { InMemorySalaryRepository } from "./interface/datasource/memory/inmemory-salary.repository";
import { CalcSalaryInteractor } from "./application/service/calc-salary/calc-salary.interactor";
import { EvaluatePersonInteractor } from "./application/service/evaluate-personal/evaluate-personal.interactor";
import { CalcSalaryUsecase } from "./application/service/calc-salary/calc-salary.usecase";
import { EvaluatePersonalUsecase } from "./application/service/evaluate-personal/evaluate-personal.usecase";

const container = new Container();
container
  .bind<AccountingEmployeeRepository>(TYPES.AccountingEmployeeRepository)
  .to(InMemoryAccountingEmployeeRepository);
container
  .bind<HumanResourceEmployeeRepository>(TYPES.HumanResourceEmployeeRepository)
  .to(InMemoryHumanResourceEmployeeRepository);
container
  .bind<ManhourRepository>(TYPES.ManhourRepository)
  .to(InMemoryManhourRepository);
container
  .bind<SalaryRepository>(TYPES.SalaryRepository)
  .to(InMemorySalaryRepository);
container
  .bind<CalcSalaryUsecase>(TYPES.CalcSalaryUsecase)
  .to(CalcSalaryInteractor);
container
  .bind<EvaluatePersonalUsecase>(TYPES.EvaluatePersonalUsecase)
  .to(EvaluatePersonInteractor);
export { container };
