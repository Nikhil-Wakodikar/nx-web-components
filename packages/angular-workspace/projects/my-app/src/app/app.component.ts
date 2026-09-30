import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}

  tcnForm = this.fb.group({
    name: ['nik', Validators.required],
    password: ['', Validators.required],
    phone: [''],
    date: ['26/08/2026'],
    acceptTcn: [false, Validators.requiredTrue],
    gender: ['', Validators.required],
    price: ['115000'],
  });

  onSubmitTnc() {
    console.log('Form submitted:', this.tcnForm.value);
  }
}
