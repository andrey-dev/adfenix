import { Injectable } from '@angular/core';
import { CalculatedSalary, CalculatorData, SplittedSalary } from './types';
import {
  BASIC_SALARY,
  SALARY_INCREASE,
  BASIC_TAX_RATE,
  MIDDLE_TAX_RATE,
  UPPER_TAX_RATE,
  MIDDLE_TAX_RATE_BOUNDARY,
  UPPER_TAX_RATE_BOUNDARY,
  INIT_SALARY,
} from './constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private readonly monthsInYear = 12;
  private readonly calculatedSalarySubj = new BehaviorSubject<CalculatedSalary>(INIT_SALARY);

  public getCalculatedSalary(): Observable<CalculatedSalary> {
    return this.calculatedSalarySubj.asObservable();
  }

  public calculateSalary(calcData: CalculatorData): void {
    const salaryBeforeTax = this.getSalaryBeforeTax(calcData);
    const basicTaxRate = BASIC_TAX_RATE[calcData.city][calcData.year];

    const splittedSalary: SplittedSalary[] = this.getSplittedSalary(salaryBeforeTax, basicTaxRate);
    const salaryAfterTax = splittedSalary.reduce((prev, curr) => {
      return prev + (curr.amount - curr.amount * curr.tax);
    }, 0);

    this.calculatedSalarySubj.next({
      monthlyGross: salaryBeforeTax,
      monthlyNet: salaryAfterTax,
      yearlyGross: salaryBeforeTax * this.monthsInYear,
      yearlyNet: salaryAfterTax * this.monthsInYear,
    });
  }

  private getSalaryBeforeTax(calcData: CalculatorData): number {
    if (!calcData) {
      return 0;
    }

    return (
      BASIC_SALARY[calcData.profession] +
      BASIC_SALARY[calcData.profession] * SALARY_INCREASE[calcData.experience]
    );
  }

  // Split salary by tax rates
  private getSplittedSalary(salaryBeforeTax: number, basicTaxRate: number): SplittedSalary[] {
    const splittedSalary: SplittedSalary[] = [];

    // Get salary and tax before 36000 SEK (MIDDLE_TAX_RATE_BOUNDARY)
    if (salaryBeforeTax - MIDDLE_TAX_RATE_BOUNDARY > 0) {
      splittedSalary.push({
        amount: MIDDLE_TAX_RATE_BOUNDARY,
        tax: basicTaxRate,
      });
    } else {
      splittedSalary.push({ amount: salaryBeforeTax, tax: basicTaxRate });
      return splittedSalary;
    }

    // Get salary and tax before 45000 SEK (UPPER_TAX_RATE_BOUNDARY)
    if (salaryBeforeTax - UPPER_TAX_RATE_BOUNDARY > 0) {
      splittedSalary.push({
        amount: UPPER_TAX_RATE_BOUNDARY - MIDDLE_TAX_RATE_BOUNDARY,
        tax: MIDDLE_TAX_RATE,
      });
    } else {
      splittedSalary.push({
        amount: salaryBeforeTax - MIDDLE_TAX_RATE_BOUNDARY,
        tax: MIDDLE_TAX_RATE,
      });
      return splittedSalary;
    }

    // Get salary and tax after 45000 SEK (UPPER_TAX_RATE_BOUNDARY)
    splittedSalary.push({
      amount: salaryBeforeTax - UPPER_TAX_RATE_BOUNDARY,
      tax: UPPER_TAX_RATE,
    });

    return splittedSalary;
  }
}
