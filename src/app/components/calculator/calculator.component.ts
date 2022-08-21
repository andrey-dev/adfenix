import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PROFESSION, CITY, YEARS_OF_EXPERIENCE } from 'src/app/constants';

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
  public years = [2019, 2020];

  public payrollForm = new FormGroup({
    experience: new FormControl(YEARS_OF_EXPERIENCE.ZeroToThree),
    profession: new FormControl(PROFESSION.Developer),
    city: new FormControl(CITY.Stockholm),
    year: new FormControl(''),
  });
  constructor() {}

  public onSubmit(): void {}
}
