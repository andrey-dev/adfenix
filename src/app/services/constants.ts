import { PROFESSION, YEARS_OF_EXPERIENCE, CITY, YEARS } from '../constants';

export const BASIC_SALARY = {
  [PROFESSION.Developer]: 30000,
  [PROFESSION.Teacher]: 27000,
  [PROFESSION.Cashier]: 25000,
};

export const SALARY_INCREASE = {
  [YEARS_OF_EXPERIENCE.ZeroToThree]: 0,
  [YEARS_OF_EXPERIENCE.FourToSeven]: 0.2,
  [YEARS_OF_EXPERIENCE.EightToTen]: 0.4,
  [YEARS_OF_EXPERIENCE.ElevenPlus]: 0.6,
};

// The basic tax rate is based on city and income year
// applied to salary between SEK 0 - 36,000
export const BASIC_TAX_RATE = {
  [CITY.Gothenburg]: {
    [YEARS[2019]]: 0.25,
    [YEARS[2020]]: 0.22,
  },
  [CITY.Stockholm]: {
    [YEARS[2019]]: 0.3,
    [YEARS[2020]]: 0.29,
  },
};
