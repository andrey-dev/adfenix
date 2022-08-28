import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  PROFESSION,
  CITY,
  YEARS,
  YEARS_OF_EXPERIENCE,
} from 'src/app/constants';
import { CalculatorService, CalculatorData } from 'src/app/services';

@Component({
  selector: 'calc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  public yearsOfExperience = Object.values(YEARS_OF_EXPERIENCE);
  public professions = Object.values(PROFESSION);
  public cities = Object.values(CITY);
  public years = Object.values(YEARS);

  public payrollForm = new FormGroup({
    experience: new FormControl(YEARS_OF_EXPERIENCE.ZeroToThree),
    profession: new FormControl(PROFESSION.Developer),
    city: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

  constructor(private calcService: CalculatorService) {}

  public get city(): FormControl {
    return this.payrollForm.get('city') as FormControl;
  }

  public get year(): FormControl {
    return this.payrollForm.get('year') as FormControl;
  }

  public onSubmit(): void {
    if (this.payrollForm.invalid) {
      return;
    }
    this.calcService.calculateSalary(this.payrollForm.value as CalculatorData);
  }
}
