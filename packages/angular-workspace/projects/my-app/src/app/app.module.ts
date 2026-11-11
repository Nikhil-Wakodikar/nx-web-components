import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserProfileDialogComponent } from './user-profile-dialog.component';
import { ComponentLibraryModule } from '@_nx/stencil-library/angular';

@NgModule({
  declarations: [AppComponent, UserProfileDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentLibraryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
