/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 *
 */
import {
  Component,
  NgModule,
  Injectable,
  Input,
  OnDestroy,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class TestService {
  private testSubject = new BehaviorSubject<string>('angular test #5');
  test$: Observable<string> = this.testSubject.asObservable();

  constructor() {}

  setTest(test: string) {
    this.testSubject.next(test);
  }
}

@Component({
  selector: 'ng-app',
  template: `
    <h2>Current test is:</h2>
    {{ test$ | async }}
    <br />
    <child [skip-current]="true"></child>
  `,
  styles: [],
})
export class MainComponent implements OnDestroy {
  test$: Observable<string>;
  private subscription: Subscription;

  constructor(private _srv: TestService) {
    this.test$ = this._srv.test$;
  }

  ngOnDestroy() {
    // Unsubscribe from observable subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

@Component({
  selector: 'child',
  template: `Sample Child component<br />
    <button (click)="next()">next test</button>`,
})
export class TextChildComponent {
  @Input('skip-current') skip = false;

  constructor(private _srv: TestService, private _router: Router) {}

  next() {
    this._srv.setTest('angular test #6');
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
      },
    ]),
  ],
  declarations: [MainComponent, TextChildComponent],
  providers: [TestService],
})
export class MainModule {}
