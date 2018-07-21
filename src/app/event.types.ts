
class EventBase {
  constructor(public source: string, public value: any) {}
}

export class AngularEvent extends EventBase {}
export class HtmlEvent extends EventBase {}
export type EventCallbackFunction = (event: EventBase) => void;
