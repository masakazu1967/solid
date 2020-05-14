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
- 一回の人事考課で投球は最大1つ下がる。
- 正社員の給与は基本給＋手当－天引き
- 契約社員の給与は基本給＋手当

### ユースケース

- 人事ロールは人事考課を行う。
  1. 人事は従業員の人事考課を行う。
  2. システムは従業員の人事考課により等級の増減を行い、データベースに保存する。
- 経理ロールは給与計算を行う。
  1. 経理は給与計算をする従業員を指示する。
  2. システムは指定された従業員の給与計算をし、データベースに保存する。
