import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from 'src/app/services';
import { CITY, YEARS } from 'src/app/constants';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  let calcServiceSpy = jasmine.createSpyObj<CalculatorService>(['calculateSalary']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatSelectModule,
        MatButtonModule,
      ],
      providers: [{ provide: CalculatorService, useValue: calcServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message for `year` field if it is empty', () => {
    component.payrollForm.get('city')?.setValue(CITY.Gothenburg);
    component.payrollForm.get('year')?.setErrors({ required: true });
    component.payrollForm.get('year')?.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain('Please select a year');
  });

  it('should show error message for `city` field if it is empty', () => {
    component.payrollForm.get('year')?.setValue(YEARS[2019]);
    component.payrollForm.get('city')?.setErrors({ required: true });
    component.payrollForm.get('city')?.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain('Please select a city');
  });

  it('should call `calculateSalary` method if form is valid', () => {
    component.payrollForm.get('city')?.setValue(CITY.Gothenburg);
    component.payrollForm.get('year')?.setValue(YEARS[2019]);
    component.onSubmit();
    fixture.detectChanges();

    expect(calcServiceSpy.calculateSalary).toHaveBeenCalled();
    expect(calcServiceSpy.calculateSalary).toHaveBeenCalledTimes(1);
    calcServiceSpy.calculateSalary.calls.reset();
  });

  it('should not call `calculateSalary` method if form is invalid', () => {
    component.onSubmit();
    fixture.detectChanges();

    expect(calcServiceSpy.calculateSalary).not.toHaveBeenCalled();
    calcServiceSpy.calculateSalary.calls.reset();
  });
});
