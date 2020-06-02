const TYPES = {
  AccountingEmployeeRepository: Symbol.for("AccountingEmployeeRepository"),
  HumanResourceEmployeeRepository: Symbol.for(
    "HumanResourceEmployeeRepository"
  ),
  ManhourRepository: Symbol.for("ManhourRepository"),
  SalaryRepository: Symbol.for("SalaryRepository"),
  AccountingEmployeeFactory: Symbol.for("AccountingEmployeeFactory"),
  CalcSalaryUsecase: Symbol.for("CalcSalaryUsecase"),
  EvaluatePersonalUsecase: Symbol.for("EvaluatePersonalUsecase"),
};

export { TYPES };
