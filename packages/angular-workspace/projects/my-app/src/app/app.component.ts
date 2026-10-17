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
    name: ['', Validators.required],
    password: ['', Validators.required],
    description: ['', Validators.required],
    appointmentDate: ['', Validators.required],
    appointmentTime: ['', Validators.required],
    notifications: [false, Validators.requiredTrue],
    acceptTcn: [false, Validators.requiredTrue],
    gender: ['', Validators.required],
    plan: ['', Validators.required],
    price: ['115000'],
  });

  onSubmitTnc() {
    console.log('Form submitted:', this.tcnForm.value);
  }

  changeAcc(event: any) {
    console.log('Accordion changed:', event);
  }

  changeRadio(event: any) {
    console.log('Radio changed:', event);
  }

  toastOpen = false;
  toastVariant:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info' = 'success';
  toastMessage = 'Operation completed successfully!';
  toastHeader = 'Success';
  toastPosition: any = 'top-right';

  showToast(
    variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info',
    message: string,
    header: string,
    position: string = 'top-right'
  ) {
    this.toastVariant = variant;
    this.toastMessage = message;
    this.toastHeader = header;
    this.toastPosition = position;
    this.toastOpen = true;
  }

  modalOpen = false;
  modalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  openModal(size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md') {
    this.modalSize = size;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
