export interface EventDetail {
  childToFocus?: string;
  isFirstErrorField: boolean;
  isautofill: boolean;
  autofilldata: string; // Adjust the type if autofilldata is not a string
  isYellow: boolean;
  isGrey: boolean;
}

export interface InputChangedEventDetail {
  name: string;
  value: string | number | boolean ;
  valid: boolean;
  IsModalOpen?: boolean;
  infoEvent?: string; // Optional dynamic event name for info icon clicks
}

interface FieldData {
  value: string;
  isYellow: boolean;
  isGrey: boolean;
  isGreen?: boolean; // Optional property
}

export interface InitialData {
  [key: string]: FieldData;
}

export interface DropdownInputType {
  id : string | number;
  value: string;
  showValue : string;
  iconUrl? : string; // Optional icon URL for dropdown options
  subTitle? : string; // Optional subtitle to display below the main text
}
export interface TableCell {
  type?: "text" | "image" | "link" | "html";
  text?: string;
  html?: string;
  imgUrl?: string;
  alt?: string;
  href?: string;
  style?: Record<string, any>;
  event?: Event,
  image?:any
}

export interface TableData {
  styles?: Record<string, any>;
  columns: {
    key: string;
    label: string;
    width?: string;
    align?: "left" | "center" | "right";
    cellStyles?: Record<string, any>;
  }[];
  rows: Array<Record<string, string | number | TableCell | boolean> >;
}
