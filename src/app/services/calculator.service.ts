import { Injectable } from '@angular/core';
import { CalculatorData } from './types';
import { BASIC_SALARY, SALARY_INCREASE, BASIC_TAX_RATE } from './constants';

// Extra high-income tax:

// If you earn between SEK 36,000 - SEK 45,000, you also pay 50% tax on all salary between SEK 36,000 - 45,000,
// in addition to the basic tax on the amount of SEK 0 - SEK 36,000

// If you earn more than SEK 45,000, you also pay 50% tax on all salary between SEK 36,000 - 45,000 and
// 70% tax on anything over SEK 45,000, in addition to the basic tax rate of sek 0 - 36,000

// 0 - 36 000 - 45 000 - ...

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  public calculateSalary(data: CalculatorData) {
    // get base salary + increase part
    const salaryBeforeTax =
      BASIC_SALARY[data.profession] +
      BASIC_SALARY[data.profession] * SALARY_INCREASE[data.experience];
  }
}
