import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentLibraryModule } from 'component-library';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CommonModule, ReactiveFormsModule, ComponentLibraryModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('creates the app with nx components', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('nx-input')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('nx-radio-buttons')
    ).toBeTruthy();
  });

  it('requires the consent and required fields before submission', () => {
    const form = fixture.componentInstance.tcnForm;

    expect(form.invalid).toBeTrue();

    form.patchValue({
      name: 'Alex',
      password: 'secret',
      acceptTcn: true,
      gender: 'female',
    });

    expect(form.valid).toBeTrue();
  });
});
