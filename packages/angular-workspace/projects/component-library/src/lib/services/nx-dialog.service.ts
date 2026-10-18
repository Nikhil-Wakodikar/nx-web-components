import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
  Type,
  createComponent,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Injection token for passing arbitrary data to dialog components.
 */
export const NX_DIALOG_DATA = new InjectionToken<any>('NX_DIALOG_DATA');
export const NX_MODAL_DATA = NX_DIALOG_DATA;

/**
 * Configuration options for opening a modal dialog.
 */
export interface NxDialogConfig<D = any> {
  /** Custom data passed to the dialog component via NX_DIALOG_DATA */
  data?: D;
  /** Modal header title */
  header?: string;
  /** Modal header subtitle */
  subHeader?: string;
  /** Dialog width size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Backdrop dismissal behavior: true, false, or 'static' */
  backdrop?: 'static' | boolean;
  /** Whether pressing Escape key closes the modal */
  keyboard?: boolean;
  /** Whether to show the close (X) button */
  dismissible?: boolean;
  /** Whether to vertically center the modal */
  centered?: boolean;
  /** Whether the body scrolls internally */
  scrollable?: boolean;
  /** Whether entrance/exit animations are enabled */
  animated?: boolean;
  /** Custom z-index */
  zIndex?: number;
}

export type NxModalConfig<D = any> = NxDialogConfig<D>;

/**
 * Reference to a dynamically opened modal dialog.
 */
export class NxDialogRef<T = any, R = any> {
  private readonly _afterClosed$ = new Subject<R | undefined>();
  private _result?: R;

  /** The instantiated Angular component instance inside the modal */
  componentInstance!: T;

  constructor(
    private modalElement: any,
    private cleanup: () => void
  ) {}

  /**
   * Closes the dialog and emits the specified result.
   */
  close(result?: R): void {
    this._result = result;
    if (this.modalElement) {
      if (typeof this.modalElement.dismiss === 'function') {
        this.modalElement.dismiss(result);
      } else {
        this.modalElement.isOpen = false;
      }
    }
  }

  /**
   * Returns an Observable that emits when the dialog is dismissed or closed.
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed$.asObservable();
  }

  /**
   * @internal
   */
  _notifyClosed(fallbackResult?: any): void {
    const finalResult = this._result !== undefined ? this._result : fallbackResult;
    this._afterClosed$.next(finalResult);
    this._afterClosed$.complete();
    this.cleanup();
  }
}

export type NxModalRef<T = any, R = any> = NxDialogRef<T, R>;

/**
 * Service to dynamically open modal dialogs with Angular components.
 *
 * Example usage:
 * ```ts
 * const dialogRef = this.dialog.open(UserProfileComponent, {
 *   header: 'User Profile',
 *   data: { userId: 123 }
 * });
 *
 * dialogRef.afterClosed().subscribe(result => {
 *   console.log('Dialog closed with:', result);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class NxDialogService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Opens a modal dialog containing the given component.
   */
  open<T, D = any, R = any>(
    component: Type<T>,
    config?: NxDialogConfig<D>
  ): NxDialogRef<T, R> {
    // 1. Create the <nx-modal> web component element
    const modalElement = document.createElement('nx-modal') as any;

    if (config?.header) modalElement.header = config.header;
    if (config?.subHeader) modalElement.subHeader = config.subHeader;
    if (config?.size) modalElement.size = config.size;
    if (config?.backdrop !== undefined) modalElement.backdrop = config.backdrop;
    if (config?.keyboard !== undefined) modalElement.keyboard = config.keyboard;
    if (config?.dismissible !== undefined) modalElement.dismissible = config.dismissible;
    if (config?.centered !== undefined) modalElement.centered = config.centered;
    if (config?.scrollable !== undefined) modalElement.scrollable = config.scrollable;
    if (config?.animated !== undefined) modalElement.animated = config.animated;
    if (config?.zIndex !== undefined) modalElement.zIndex = config.zIndex;

    let dialogRef: NxDialogRef<T, R>;
    let componentRef: ComponentRef<T>;

    const cleanup = () => {
      if (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      }
      if (modalElement?.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
      }
    };

    dialogRef = new NxDialogRef<T, R>(modalElement, cleanup);

    // 2. Create custom Injector providing NxDialogRef and NX_DIALOG_DATA
    const childInjector = Injector.create({
      providers: [
        { provide: NxDialogRef, useValue: dialogRef },
        { provide: NX_DIALOG_DATA, useValue: config?.data },
      ],
      parent: this.injector,
    });

    // 3. Dynamically instantiate the component
    componentRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      elementInjector: childInjector,
    });

    dialogRef.componentInstance = componentRef.instance;
    this.appRef.attachView(componentRef.hostView);

    // 4. Append child component element into modalElement and modal to body
    modalElement.appendChild(componentRef.location.nativeElement);
    document.body.appendChild(modalElement);

    // 5. Listen for nxDismiss event from modal
    const dismissHandler = (event: any) => {
      modalElement.removeEventListener('nxDismiss', dismissHandler);
      const detail = event?.detail || event;
      dialogRef._notifyClosed(detail?.role);
    };

    modalElement.addEventListener('nxDismiss', dismissHandler);

    // 6. Open the modal
    modalElement.isOpen = true;

    return dialogRef;
  }
}

/**
 * Alias for NxDialogService
 */
@Injectable({
  providedIn: 'root',
})
export class NxModalService extends NxDialogService {}

