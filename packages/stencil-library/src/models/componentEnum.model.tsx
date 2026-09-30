// componentEnum.model.tsx

export enum TrackerStatus {
  Completed = 'completed',
  InProgress = 'in-progress',
  Pending = 'pending',
  Rejected = 'rejected',
}

export enum TrackerPosition {
  First = 'first',
  Middle = 'middle',
  Last = 'last',
}

export enum RadioChildrenVarient {
  BorderOutLined = 'border-outlined',
  BorderNone = 'border-none',
}

export enum RadioChildrenDisplayMode {
  Default = 'default',
  Flat = 'flat',
}

export enum RadioGroupAlign {
  Start = 'start',
  Center = 'center',
  End = 'end'
}

export enum VerticalTrackerVariant {
  DefaultIconStepper = 'default-icon-stepper',
  IconStepper = 'icon-stepper',
  NumberedStepper = 'numbered-stepper',
  IconNumberStepper = 'icon-number-stepper',
  AccordionStepper = 'accordion-stepper',
  AutoPay = 'auto-pay-stepper'
}

// NEW ENUM for direction control
export enum TrackerDirection {
  Default = 'default',
  Reverse = 'reverse',
}
