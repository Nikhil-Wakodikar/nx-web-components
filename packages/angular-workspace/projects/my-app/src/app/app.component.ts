import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NxDialogService } from 'component-library';
import { UserProfileDialogComponent } from './user-profile-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private fb: FormBuilder,
    private dialog: NxDialogService
  ) {}

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

  openUserProfileProgrammatic() {
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
      header: 'Edit User Profile',
      subHeader: 'Demonstrating dialog.open(UserProfileDialogComponent, config)',
      size: 'md',
      data: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: 'Senior Developer',
      },
      backdrop: true,
      keyboard: true,
      dismissible: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Programmatic dialog closed:', result);
      if (result?.saved) {
        this.showToast('success', `Saved: ${result.name} (${result.email})`, 'Profile Updated');
      }
    });
  }

  chipTags = ['Angular', 'TypeScript', 'Stencil', 'Web Components'];

  removeChipTag(tag: string) {
    this.chipTags = this.chipTags.filter((t) => t !== tag);
    this.showToast('info', `Removed tag: ${tag}`, 'Chip Removed');
  }

  tableColumns = [
    { key: 'id', title: 'ID', width: '70px', align: 'center' },
    { key: 'name', title: 'Employee', sortable: true },
    { key: 'role', title: 'Role', sortable: true },
    { key: 'department', title: 'Department', sortable: true },
    { key: 'status', title: 'Status', sortable: true },
    { key: 'salary', title: 'Salary', align: 'right', sortable: true },
  ];

  tableData = [
    { id: 101, name: 'Sarah Connor', role: 'DevOps Lead', department: 'Engineering', status: 'Active', salary: '$135,000' },
    { id: 102, name: 'James Wilson', role: 'Frontend Engineer', department: 'Product UI', status: 'Active', salary: '$110,000' },
    { id: 103, name: 'Elena Rostova', role: 'Data Scientist', department: 'Analytics', status: 'On Leave', salary: '$125,000' },
    { id: 104, name: 'Michael Chang', role: 'Security Architect', department: 'Infrastructure', status: 'Active', salary: '$145,000' },
    { id: 105, name: 'Amina Diallo', role: 'UX Designer', department: 'Design', status: 'Active', salary: '$105,000' },
    { id: 106, name: 'Lucas Silva', role: 'Fullstack Dev', department: 'Engineering', status: 'Active', salary: '$118,000' },
    { id: 107, name: 'Rachel Green', role: 'Product Manager', department: 'Management', status: 'Active', salary: '$140,000' },
    { id: 108, name: 'David Kim', role: 'QA Automation', department: 'Quality', status: 'Inactive', salary: '$98,000' },
    { id: 109, name: 'Olivia Taylor', role: 'Cloud Engineer', department: 'Infrastructure', status: 'Active', salary: '$130,000' },
    { id: 110, name: 'Marcus Brody', role: 'Backend Dev', department: 'Engineering', status: 'Active', salary: '$122,000' },
  ];

  tableStriped = true;
  tableHoverable = true;
  tableBordered = false;
  tableLoading = false;
  tableSize: 'sm' | 'md' | 'lg' = 'md';
  tableSelectedCount = 0;

  toggleTableLoading() {
    this.tableLoading = true;
    setTimeout(() => {
      this.tableLoading = false;
    }, 1200);
  }

  onTableSort(event: any) {
    console.log('Table sorted:', event);
    this.showToast('info', `Sorted by ${event.column} (${event.direction})`, 'Table Sort');
  }

  onTableSelectionChange(event: any) {
    console.log('Table selection:', event);
    this.tableSelectedCount = event.selectedKeys?.length || 0;
  }

  onTableRowClick(event: any) {
    console.log('Row clicked:', event);
    this.showToast('primary', `Clicked row: ${event.row.name} (${event.row.role})`, 'Row Selected');
  }

  selectedListItem = 'security';

  onListChange(event: any) {
    console.log('List selection changed:', event);
    this.selectedListItem = event.value;
    this.showToast('primary', `Selected item: ${event.value}`, 'List Selection');
  }

  onListItemClick(event: any) {
    console.log('List item clicked:', event);
    this.showToast('info', `Clicked: ${event.value || 'Item'}`, 'List Item Click');
  }
}
