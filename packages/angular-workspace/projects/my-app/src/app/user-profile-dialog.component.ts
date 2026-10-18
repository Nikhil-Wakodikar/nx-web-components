import { Component, Inject } from '@angular/core';
import { NxDialogRef, NX_DIALOG_DATA } from 'component-library';

export interface UserProfileData {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-profile-dialog',
  template: `
    <div style="display: flex; flex-direction: column; gap: 14px">
      <p style="margin: 0; color: #475569; font-size: 14px">
        Manage user details and permissions for <strong>{{ data.name }}</strong
        >.
      </p>

      <div style="display: flex; flex-direction: column; gap: 6px">
        <nx-input
          label="Full name"
          [(ngModel)]="userName"
          placeholder="Enter name"
        ></nx-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px">
        <nx-input
          label="Email Address"
          [(ngModel)]="userEmail"
          placeholder="Enter email"
        ></nx-input>
      </div>

      <div
        slot="footer"
        style="display: flex; gap: 10px; justify-content: flex-end; width: 100%"
      >
        <nx-button variant="outline" (click)="cancel()">Cancel</nx-button>
        <nx-button (click)="save()">Save Profile</nx-button>
      </div>
    </div>
  `,
})
export class UserProfileDialogComponent {
  userName = this.data?.name || '';
  userEmail = this.data?.email || '';

  constructor(
    public dialogRef: NxDialogRef<UserProfileDialogComponent>,
    @Inject(NX_DIALOG_DATA) public data: UserProfileData
  ) {}

  save() {
    this.dialogRef.close({
      saved: true,
      name: this.userName,
      email: this.userEmail,
    });
  }

  cancel() {
    this.dialogRef.close({ saved: false });
  }
}
