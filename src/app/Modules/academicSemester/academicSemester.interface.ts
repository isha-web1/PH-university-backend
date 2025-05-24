export type Months =
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
  | 'December';


  export type AcademicSemesterName = 'Autumn' | 'Samar' | 'Fall';
  export type AcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: AcademicSemesterName;
  code: AcademicSemesterCode;
  year: Date;
  startMonth: Months;
  endMonth: Months;
};