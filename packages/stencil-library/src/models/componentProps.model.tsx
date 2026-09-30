import { TrackerState } from "./componentEnums.model";

export interface ComponentProps {
    name: string;
    label: string;
    placeholder: string;
    value: string | number | boolean;
    hasCustomError: boolean;
    customErrorMessage: string;
  }


  export interface VerticalTrackerStep {
    id: string;
    status: string;
    disabled?: boolean;
  }
export type RadiochipLayoutVariant = 'scroll' | 'wrap';
export type RadiochipSizeVariant = 'auto' | 'small' | 'medium' | 'large';
export type YearInputVariant = 'full-width' | 'half-width';

export interface RadiochipInputList{
  value : number | string,
  isdisabled : boolean,
  label?: string, // Optional label if different from value
  showDropdown?: boolean // Optional: controls dropdown icon per chip
}

export interface CustomLabel {
  parts: { text: string; style?: { [key: string]: string } }[];
}


export interface TrackerSteps{
  name:string
  state:TrackerState | string
  percentage?: number

}
