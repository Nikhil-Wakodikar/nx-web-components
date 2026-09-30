import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: 'nx-input[dateFormat]',
})
export class DateFormatDirective implements AfterViewInit, OnDestroy {
  private input?: HTMLInputElement;
  private nxInput?: any;

  private readonly onInput = () => {
    this.formatDate();
  };

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  async ngAfterViewInit() {
    this.nxInput = this.host.nativeElement as any;

    this.input = await this.nxInput.getInputElement();

    if (!this.input) {
      return;
    }

    this.input.addEventListener('input', this.onInput);

    this.formatDate();
  }

  private async formatDate(): Promise<void> {
    if (!this.input || !this.nxInput) {
      return;
    }

    const digits = this.input.value.replace(/\D/g, '').substring(0, 8);

    let formatted = digits;

    if (digits.length >= 2 && digits.length <= 4) {
      formatted = `${digits.substring(0, 2)}/` + digits.substring(2);

      if (digits.length === 4) {
        formatted += '/';
      }
    } else if (digits.length > 4) {
      formatted =
        `${digits.substring(0, 2)}/` +
        `${digits.substring(2, 4)}/` +
        digits.substring(4);
    }

    await this.nxInput.setInputValue(formatted);
  }

  ngOnDestroy() {
    this.input?.removeEventListener('input', this.onInput);
  }
}
