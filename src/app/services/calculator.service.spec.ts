import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  beforeEach(() => {
    service = new CalculatorService();
  });

  it('getCalculatedSalary() method should be presented', () => {
    expect(service.getCalculatedSalary).toBeTruthy();
  });

  it('calculateSalary() method should be presented', () => {
    expect(service.calculateSalary).toBeTruthy();
  });
});
