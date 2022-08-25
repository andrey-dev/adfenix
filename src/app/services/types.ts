import { PROFESSION, YEARS_OF_EXPERIENCE } from '../constants';

export interface CalculatorData {
  experience: YEARS_OF_EXPERIENCE;
  profession: PROFESSION;
  city: string;
  year: string;
}
