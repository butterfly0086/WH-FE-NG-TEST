/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding

@Component({
  selector: 'ng-app',
  template: `<form (submit)="onSubmit($event)">
    <h2>Login</h2>
    <br />
    <input type="email" name="email" [(ngModel)]="email" placeholder="Email" />
    <div *ngIf="emailError" style="color: red">{{ emailError }}</div>
    <br />
    <input
      type="password"
      name="password"
      [(ngModel)]="password"
      placeholder="Password"
    />
    <div *ngIf="passwordError" style="color: red">{{ passwordError }}</div>
    <br />
    <button type="submit">Submit</button>
    <br /><br />
    <div *ngIf="logged_in">Logged In!</div>
  </form>`,
})
export class Test03Component {
  email: string = '';
  password: string = '';

  emailError: string = '';
  passwordError: string = '';
  logged_in: boolean = false;

  validateEmail(email: string): boolean {
    return email.endsWith('@a.com');
  }

  validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    return (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      hasMinLength
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.emailError = '';
    this.passwordError = '';

    const isEmailValid = this.validateEmail(this.email);
    const isPasswordValid = this.validatePassword(this.password);

    if (!isEmailValid) {
      this.emailError = 'Email must end with @a.com';
    }

    if (!isPasswordValid) {
      this.passwordError =
        'Password must contain at least one special character, one upper case letter, one lower case letter, one number, and be at least 8 characters long';
    }

    if (isEmailValid && isPasswordValid) {
      this.logged_in = true;
    } else {
      this.logged_in = false;
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Test03Component,
      },
    ]),
  ],
  declarations: [Test03Component],
})
export class Test03Module {}
