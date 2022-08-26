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
} from './constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private initSalary: CalculatedSalary = {
    monthlyGross: 0,
    monthlyNet: 0,
    yearlyGross: 0,
    yearlyNet: 0,
  };
  private readonly calculatedSalarySubj = new BehaviorSubject<CalculatedSalary>(this.initSalary);

  public get calculatedSalary(): Observable<CalculatedSalary> {
    return this.calculatedSalarySubj.asObservable();
  }

  constructor() {}

  public calculateSalary(data: CalculatorData): void {
    // get base salary + increase part
    const salaryBeforeTax =
      BASIC_SALARY[data.profession] +
      BASIC_SALARY[data.profession] * SALARY_INCREASE[data.experience];
    const basicTaxRate = BASIC_TAX_RATE[data.city][data.year];

    const splittedSalary: SplittedSalary[] = this.getSplittedSalary(salaryBeforeTax, basicTaxRate);
    const salaryAfterTax = splittedSalary.reduce((prev, curr) => {
      return prev + (curr.amount - curr.amount * curr.tax);
    }, 0);

    this.calculatedSalarySubj.next({
      monthlyGross: salaryBeforeTax,
      monthlyNet: salaryAfterTax,
      yearlyGross: salaryBeforeTax * 12,
      yearlyNet: salaryAfterTax * 12,
    });
  }

  // Split salary by tax rates
  private getSplittedSalary(salaryBeforeTax: number, basicTaxRate: number): SplittedSalary[] {
    const splittedSalary: SplittedSalary[] = [];

    if (salaryBeforeTax - MIDDLE_TAX_RATE_BOUNDARY > 0) {
      splittedSalary.push({ amount: MIDDLE_TAX_RATE_BOUNDARY, tax: basicTaxRate });
    } else {
      splittedSalary.push({ amount: salaryBeforeTax, tax: basicTaxRate });
      return splittedSalary;
    }

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

    splittedSalary.push({ amount: salaryBeforeTax - UPPER_TAX_RATE_BOUNDARY, tax: UPPER_TAX_RATE });

    return splittedSalary;
  }
}
