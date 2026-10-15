import { Injectable, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class NxEventPlugin {
  manager: any;

  constructor(@Inject(DOCUMENT) private doc: any, private ngZone: NgZone) {}

  supports(eventName: string): boolean {
    return eventName.startsWith('nx') || eventName === 'checkedChange';
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const wrappedHandler = (event: any) => {
      const data =
        event && typeof event === 'object' && 'detail' in event
          ? event.detail
          : event;
      return this.ngZone.run(() => handler(data));
    };
    element.addEventListener(eventName, wrappedHandler, false);
    return () => element.removeEventListener(eventName, wrappedHandler, false);
  }
}
