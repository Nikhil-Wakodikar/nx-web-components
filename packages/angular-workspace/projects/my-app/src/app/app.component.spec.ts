import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentLibraryModule, InputValueAccessor } from 'component-library';
import { defineCustomElements } from '@_nx/stencil-library/loader';
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
    expect(
      fixture.nativeElement.querySelector('nx-icon[name="settings"]')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('nx-select')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('nx-radio-group')).toBeTruthy();
  });

  it('exposes NX design tokens globally', () => {
    expect(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--nx-color-primary')
        .trim()
    ).toBe('#8145b5');
  });

  it('renders the named settings icon', async () => {
    await customElements.whenDefined('nx-icon');
    const icon = fixture.nativeElement.querySelector(
      'nx-icon[name="settings"]'
    );
    await (icon as any).componentOnReady();

    expect(icon.shadowRoot.querySelector('svg path')).toBeTruthy();
    expect(icon.getAttribute('aria-label')).toBe('Settings');
  });

  it('uses the semantic primary color for nx-button', async () => {
    await customElements.whenDefined('nx-button');
    await fixture.whenStable();

    const buttonHost = fixture.nativeElement.querySelector('nx-button');
    await (buttonHost as any).componentOnReady();
    const button = buttonHost.shadowRoot.querySelector('.button-native');

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
      plan: 'standard',
    });

    expect(form.valid).toBeTrue();
  });

  it('updates the reactive form when a select option is chosen', async () => {
    await customElements.whenDefined('nx-select');
    await customElements.whenDefined('nx-select-option');
    await fixture.whenStable();

    const select = fixture.nativeElement.querySelector(
      'nx-select[formControlName="plan"]'
    );
    const selectDebugElement = fixture.debugElement.query(
      By.css('nx-select[formControlName="plan"]')
    );
    expect(
      selectDebugElement.injector.get(InputValueAccessor, null)
    ).toBeTruthy();
    await (select as any).componentOnReady();
    const emittedValues: string[] = [];
    select.addEventListener('nxChange', (event: CustomEvent<string>) => {
      emittedValues.push(event.detail);
    });
    const trigger = select.shadowRoot.querySelector(
      '.select-trigger'
    ) as HTMLButtonElement;
    trigger.click();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve())
    );
    expect(
      select.shadowRoot.querySelector('.options-panel').hidden
    ).toBeFalse();

    const option = select.querySelector(
      'nx-select-option[value="premium"]'
    ) as HTMLElement;
    await (option as any).componentOnReady();
    option.click();

    await fixture.whenStable();
    expect(select.value).toBe('premium');
    expect(emittedValues).toEqual(['premium']);
    expect(fixture.componentInstance.tcnForm.controls.plan.value).toBe(
      'premium'
    );
  });

  it('uses the primary border whenever nx-select is focused', async () => {
    await customElements.whenDefined('nx-select');
    await fixture.whenStable();

    const select = fixture.nativeElement.querySelector('nx-select');
    await (select as any).componentOnReady();
    const trigger = select.shadowRoot.querySelector(
      '.select-trigger'
    ) as HTMLButtonElement;
    trigger.focus();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve())
    );

    expect(trigger.matches(':focus')).toBeTrue();
    expect(getComputedStyle(trigger).borderTopColor).toBe('rgb(129, 69, 181)');
  });
});
