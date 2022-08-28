import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  CalculatorComponent,
  HeaderComponent,
  ResultComponent,
} from './components';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        CalculatorComponent,
        ResultComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
