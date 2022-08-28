import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CalculatedSalary, CalculatorService, INIT_SALARY } from 'src/app/services';

import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  const calculatedSalary: CalculatedSalary = {
    monthlyGross: 20000,
    monthlyNet: 15000,
    yearlyGross: 500000,
    yearlyNet: 300000,
  };
  const calcServiceSpy = jasmine.createSpyObj<CalculatorService>(['getCalculatedSalary']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      providers: [{ provide: CalculatorService, useValue: calcServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render 0.00 income on start', () => {
    calcServiceSpy.getCalculatedSalary.and.returnValue(of(INIT_SALARY));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.gross-annual-income')?.textContent).toContain(
      'Annual income: 0.00 SEK',
    );
    expect(compiled.querySelector('.gross-monthly-income')?.textContent).toContain(
      'Monthly income: 0.00 SEK',
    );
    expect(compiled.querySelector('.net-annual-income')?.textContent).toContain(
      'Annual income: 0.00 SEK',
    );
    expect(compiled.querySelector('.net-monthly-income')?.textContent).toContain(
      'Monthly income: 0.00 SEK',
    );
  });

  it('should render salary after calculation', () => {
    calcServiceSpy.getCalculatedSalary.and.returnValue(of(calculatedSalary));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.gross-annual-income')?.textContent).toContain(
      `Annual income: 500,000.00 SEK`,
    );
    expect(compiled.querySelector('.gross-monthly-income')?.textContent).toContain(
      `Monthly income: 20,000.00 SEK`,
    );
    expect(compiled.querySelector('.net-annual-income')?.textContent).toContain(
      `Annual income: 300,000.00 SEK`,
    );
    expect(compiled.querySelector('.net-monthly-income')?.textContent).toContain(
      `Monthly income: 15,000.00 SEK`,
    );
  });
});
