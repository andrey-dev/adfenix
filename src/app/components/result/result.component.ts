import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculatorService, CalculatedSalary } from 'src/app/services';

@Component({
  selector: 'calc-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent implements OnInit {
  public calculatedSalary$: Observable<CalculatedSalary> | undefined;

  constructor(private calcService: CalculatorService) {}

  ngOnInit(): void {
    this.calculatedSalary$ = this.calcService.calculatedSalary;
  }
}
