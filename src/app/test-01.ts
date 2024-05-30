/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from "@angular/router";

@Component({
    selector: 'ng-app',
    template: `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{ monthly_payment | currency:'USD':'symbol':'1.0-0' }} <br/>
                    <b>Late Payment Fee:</b> {{ late_payment | currency:'USD':'symbol':'1.0-0' }} <br/>
                </div>`
})
export class Test01Component implements OnInit {

    private _loan_amount: number = 1000;
    monthly_payment: string = '';
    late_payment: string = '';

    ngOnInit() {
        this.updatePayments();
    }

    @Input()
    set loan_amount(value: number) {
        this._loan_amount = value || 0; // Ensure _loan_amount is never undefined or null
        this.updatePayments();
    }

    get loan_amount(): number {
        return this._loan_amount;
    }

    private updatePayments() {
        if (this._loan_amount === 0) {
            this.monthly_payment = 'N/A';
            this.late_payment = 'N/A';
        } else {
            const monthly = 0.02 * this._loan_amount; // 2% of loan amount
            this.monthly_payment = monthly.toFixed(2); // Convert number to string with 2 decimal places
            const late = 0.05 * monthly; // 5% of the monthly payment
            this.late_payment = late.toFixed(2);
        }
    }
}

@NgModule({
    imports: [
        CommonModule, // Include CommonModule here
        RouterModule.forChild([
            {
                path: "",
                component: Test01Component
            }
        ])
    ],
    declarations: [Test01Component]
})
export class Test01Module {}
