export type Tmonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type AcademicSemisterName = 'Atumn' | 'Summar' | 'Fall'
export type AcademicSemisterCode = '01' | '02' | '03'
export type TAcademic = {
  name: AcademicSemisterName
  code: AcademicSemisterCode
  year: string
  startMonth: Tmonth
  endMonth: Tmonth
}
