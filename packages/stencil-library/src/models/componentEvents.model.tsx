import { EventEmitter } from "@stencil/core";
import { InputChangedEventDetail } from "./events.model";

export interface ComponentEvents {
    inputChanged: EventEmitter<InputChangedEventDetail>;
    onPopUp: EventEmitter<InputChangedEventDetail>;
}