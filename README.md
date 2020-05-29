[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/masakazu1967/solid) 

# SOLID原則

オブジェクト指向プログラムの分野においてソフトウェア設計の5つの原則のこと。
5つの原則の頭文字を取ってSOLIDという。

- 単一責任の原則 (**S**ingle Responsibility Principle, SRP)
- オープン/クローズドの原則 (**O**pen/Closed Principle, OCP)
- リスコフの置換原則 (**L**iskov Substitution Principle, LSP)
- インターフェイス分離の原則 (**I**nterface Segregation Principle, ISP)
- 依存性逆転の原則 (**D**ependency Inversion Principle, DIP)

## はじめに

人事考課を行い、給与計算を行うというユースケースがあるプログラムを作成する。
表示はまだ考慮していないため、ユースケースそうまでしか作成しない。

### ドメインルール

- 従業員の雇用形態は正社員と契約社員
- 人事考課により等級の増減がある
- 一回の人事考課で等級は最大2つ上がる。
- 一回の人事考課で等級は最大1つ下がる。
- 正社員の給与は基本給＋手当－天引き
- 契約社員の給与は基本給＋手当

### ユースケース

- 人事ロールは人事考課を行う。
  1. 人事は従業員の人事考課を行う。
  2. システムは従業員の人事考課により等級の増減を行い、データベースに保存する。
- 経理ロールは給与計算を行う。
  1. 経理は給与計算をする従業員を指示する。
  2. システムは指定された従業員の給与計算をし、データベースに保存する。

## 単一責任の原則 (SRP)

モジュールを変更する理由はたった一つになるようにする

Employeeクラスは人事考課とデータベース管理の責務を負っています。
データベースの管理のメソッドが影響を受ける修正があった場合でも人事考課のメソッドも再コンパイルが必要。

```typescript
export class Employee {

  /**
   * 人事考課を行う
   * @param fluctuation 等級の増減
   */
  evaluatePersonal(fluctuation: number): void {
    if (this._grade) {
      this._grade = this._grade + fluctuation;
    }
  }

  /**
   * 指定した社員番号の従業員を取得する
   * @param employeeNumber 社員番号
   */
  findByEmployeeNumber(employeeNumber: string): Promise<void> {
    ...
    return Promise.resolve();
  }

  /**
   * 従業員を保存する
   */
  save(): Promise<void> {
    ...
    return Promise.resolve();
  }
}
```

人事考課のクラスとデータベース管理のクラスを分けることで解消する。

```typescript
export class Employee {

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

export class EmployeeRepository {
  /**
   * 指定した社員番号の従業員を取得する
   * @param employeeNumber 社員番号
   */
  findByEmployeeNumber(employeeNumber: string): Promise<Employee> {
    ...
    return Promise.resolve(employee);
  }

  /**
   * 従業員を保存する
   */
  save(employee: Employee): Promise<void> {
    ...
    return Promise.resolve();
  }
}
```

## オープン/クローズドの原則 (OCP)

拡張に対してはオープンに、修正に対してはクローズドにする

Employeeの給与計算ロジック中に雇用形態ごとに計算している。

```typescript
class Employee {
  ...
  /**
   * 給与を計算する
   * @return 給与金額
   */
  calcSalary(): number {
    let salary = 0;
    if (this.employmentSystem === EmploymentSystem.FulltimeEmployee) {
      // 正社員は基本給+手当-天引
      salary = this.basicSalary + this.allowance - this.deduction;
    }
    if (this.employmentSystem === EmploymentSystem.ContractEmployee) {
      // 契約社員は基本給+手当
      salary = this.basicSalary + this.allowance;
    }
    return salary;
  }
}
```

パート社員も採用することになったが、既存のメソッド`calcSalary`を修正する必要がある。修正すると動作に支障が出ないか確認する必要が出てしまう。
雇用形態ごとに従業員クラスを作成する。

```typescript
/**
 * 従業員
 */
abstract class Employee {
  abstract calcSalary(): Promise<number>;
}

/**
 * 正社員
 */
class FulltimeEmployee extends Employee {
  calcSalary(): Promise<number> {
    // 正社員は基本給+手当-天引
    return Promise.resolve(this.basicSalary + this.allowance - this.deduction);
  }
}

/**
 * 契約社員
 */
class ContractEmployee extends Employee {
  calcSalary(): Promise<number> {
    // 契約社員は基本給+手当
    return Promise.resolve(this.basicSalary + this.allowance);
  }
}
```

このような作りにしていると、パート社員を採用することになった場合はParttimeEmployeeクラスを作成するだけでOK。

```typescript
/**
 * パート社員
 */
class ParttimeEmployee extends Employee {
  private _WAGE = 800;  // 時給
  calcSalary(): Promise<number> {
    // パート社員は時給×作業時間＋手当
    const manhour = await this._findManhour();  // パート社員の作業時間を取得する
    return this._WAGE * manhour + this.allowance;
  }
}
```

## リスコフの置換原則 (LSP)

S が T の派生型であれば、プログラム内で T 型のオブジェクトが使われている箇所は全て S 型のオブジェクトで置換可能
Tは仕様書で、Sはその実装と読み替えるならば、基本型で決められた約束を派生型で破ってはいけないということ。

この原則に違反することは、OCPの違反にもつながってしまう。

```typescript
/**
 * 金額
 */
export class Price {
  constructor(protected _price: number, protected _number: number) {
  }

  get price(): number {
    return this._price;
  }

  /**
   * 合計金額と単価から個数を割り出す
   */
  get number(): number {
    return this.getTotalPrice() / this.price;
  }

  /**
   * 合計金額を取得する
   */
  getTotalPrice(): number {
    return this._price * this._number;
  }
}
```

価格クラスに合計金額と単価から個数を割り出す機能がある場合、以下のテストは意図したとおりに動作する。

```typescript
  const price = new Price(1000, 5);
  expect(price.number).toBe(5);
```

しかし、税込価格クラスで合計金額を取得する機能を変更した場合

```typescript
/**
 * 税込価格
 */
export class TaxPrice extends Price {
  constructor(price: number, number: number, private _rate: number) {
    super(price, number);
  }

  /**
   * 合計金額を取得する
   */
  getTotalPrice(): number {
    return this.price * this._number * this._rate;
  }
}
```

以下のクラスは意図したとおりには動作しない。

```typescript
  const price = new TaxPrice(1000, 5, 1.1);
  expect(price.number).toBe(5);
```

```
    expect(received).toBe(expected) // Object.is equality

    Expected: 5
    Received: 5.5
```

正しいis-a関係が成り立たない場合は、他の方法を模索する。

- 共通している部分を抽象クラスとしてis-a関係を成立させる。
- is-a関係を解消し、has-a関係であるコンポジション（委譲）にする。

委譲を選んだ場合の対応は以下の通りである。

```typescript
export class TaxPrice {
  private _price: Price;
  constructor(price: number, number: number, private _rate: number) {
    this._price = new Price(price, number);
  }

  /**
   * 価格クラスの個数アクセッサに委譲する
   */
  get number(): number {
    return this._price.number;
  }

  /**
   * 消費税を付与した合計金額
   */
  getTaxIncludedTotalPrice(): number {
    return this._price.getTotalPrice() * this._rate;
  }
}
```

テストは正常に終了する。

```
 PASS  src/domain/model/price/tax-price.spec.ts
```

## インターフェイス分離の原則 (ISP)

顧客に特化した細粒度のインタフェースを作れ
顧客は自分たちが使わないインターフェースに依存することを強いられるべきではない

パート社員は人事考課の対象外であるというような場合、従業員クラスには人事考課のメソッドがあり、パート社員も従業員クラスから派生しているため、人事考課のメソッドを継承している。
経理サービスでは使用しない人事考課のインターフェイスに依存したくないため、分離する。

変更前

```plantuml
abstract class 抽象Employee
class 正社員
class 契約社員
class パート社員

抽象Employee <|- 正社員
抽象Employee <|- 契約社員
抽象Employee <|- パート社員
```

変更後

```plantuml
interface 人事Employee
interface 経理Employee
abstract class 抽象Employee
abstract class 抽象人事Employee
abstract class 抽象経理Employee
class 正社員
class 契約社員
class パート社員

抽象Employee <|- 抽象人事Employee
抽象Employee <|- 抽象経理Employee
人事Employee <|- 抽象人事Employee
経理Employee <|- 抽象経理Employee
抽象人事Employee <|- 正社員
経理Employee <|- 正社員
抽象人事Employee <|- 契約社員
経理Employee <|- 契約社員
抽象Employee <|- パート社員
経理Employee <|- パート社員
```
