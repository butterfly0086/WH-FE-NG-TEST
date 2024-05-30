/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import {
  Component,
  NgModule,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding

@Component({
  selector: 'textfield',
  template:
    '<input type="text" [(ngModel)]="field" (ngModelChange)="onFieldChange($event)" />',
})
export class TextField {
  field: string = '';

  @Output() fieldChange = new EventEmitter<string>();

  onFieldChange(value: string) {
    this.fieldChange.emit(value);
  }
}

@Component({
  selector: 'child-component',
  template: `<h2>
    Title:
    <h2><br /><textfield (fieldChange)="onFieldChange($event)"></textfield></h2>
  </h2>`,
})
export class ChildComponent {
  @Output() titleChange = new EventEmitter<string>();

  onFieldChange(value: string) {
    this.titleChange.emit(value);
  }
}

@Component({
  selector: 'ng-app',
  template: `<div>
    <child-component (titleChange)="title = $event"></child-component> <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  title: string = '';
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
