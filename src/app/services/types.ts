import { CITY, PROFESSION, YEARS_OF_EXPERIENCE, YEARS } from '../constants';

type YearKeys = keyof typeof YEARS;

export interface CalculatorData {
  experience: YEARS_OF_EXPERIENCE;
  profession: PROFESSION;
  city: CITY;
  year: typeof YEARS[YearKeys];
}

export interface SplittedSalary {
  amount: number;
  tax: number;
}

export interface CalculatedSalary {
  monthlyGross: number;
  monthlyNet: number;
  yearlyGross: number;
  yearlyNet: number;
}
