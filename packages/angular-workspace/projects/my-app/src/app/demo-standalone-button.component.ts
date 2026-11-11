import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxButton } from '@_nx/stencil-library/angular';

@Component({
  selector: 'app-demo-standalone-button',
  standalone: true,
  imports: [CommonModule, NxButton],
  template: `
    <div
      style="
        padding: 16px;
        margin: 16px 0;
        border: 2px dashed #8145b5;
        border-radius: 8px;
        background: #faf5ff;
      "
    >
      <h3 style="margin-top: 0; color: #581c87">
        Standalone Angular Component Demo
      </h3>
      <p style="color: #6b21a8; font-size: 14px">
        This is an Angular standalone component that imports and uses only
        <code>NxButton</code> from <code>@_nx/stencil-library/angular</code>.
      </p>

      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
        <nx-button variant="primary" (click)="onButtonClick('Primary')">
          Primary Button (Clicked {{ count }} times)
        </nx-button>

        <nx-button variant="secondary" (click)="onButtonClick('Secondary')">
          Secondary Button
        </nx-button>

        <nx-button variant="outline" (click)="onButtonClick('Outline')">
          Outline Button
        </nx-button>
      </div>

      <p
        *ngIf="lastAction"
        style="margin-bottom: 0; margin-top: 10px; font-weight: 500; color: #166534"
      >
        {{ lastAction }}
      </p>
    </div>
  `,
})
export class DemoStandaloneButtonComponent {
  count = 0;
  lastAction = '';

  onButtonClick(variant: string) {
    this.count++;
    this.lastAction = `Last action: Clicked ${variant} button (Total clicks: ${this.count})`;
  }
}
