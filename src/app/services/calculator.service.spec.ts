import { TestBed, inject } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService],
    });
  });

  it('should be created', inject([CalculatorService], (service: CalculatorService) => {
    expect(service).toBeTruthy();
  }));

  it('getCalculatedSalary() method should be presented', inject(
    [CalculatorService],
    (service: CalculatorService) => {
      expect(service.getCalculatedSalary).toBeTruthy();
    },
  ));

  it('calculateSalary() method should be presented', inject(
    [CalculatorService],
    (service: CalculatorService) => {
      expect(service.calculateSalary).toBeTruthy();
    },
  ));
});
