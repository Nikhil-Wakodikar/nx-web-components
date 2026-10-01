import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentLibraryModule } from 'component-library';
import { defineCustomElements } from 'stencil-library/loader';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await defineCustomElements(window);

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
    expect(fixture.nativeElement.querySelector('nx-radio-group')).toBeTruthy();
  });

  it('exposes NX design tokens globally', () => {
    expect(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--nx-color-primary')
        .trim()
    ).toBe('#8145b5');
  });

  it('uses the semantic primary color for nx-button', async () => {
    await customElements.whenDefined('nx-button');
    await fixture.whenStable();

    const button = fixture.nativeElement
      .querySelector('nx-button')
      .shadowRoot.querySelector('.button-native');

    expect(getComputedStyle(button).backgroundColor).toBe('rgb(129, 69, 181)');
  });

  it('keeps nx-input transparent and uses primary on focus', async () => {
    await customElements.whenDefined('nx-input');
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('nx-input');
    const wrapper = input.shadowRoot.querySelector('.native-wrapper');
    const nativeInput = input.shadowRoot.querySelector('.native-input');

    expect(getComputedStyle(wrapper).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    nativeInput.focus();
    expect(getComputedStyle(wrapper).borderTopColor).toBe('rgb(129, 69, 181)');
    expect(getComputedStyle(wrapper).backgroundColor).toBe('rgba(0, 0, 0, 0)');
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
