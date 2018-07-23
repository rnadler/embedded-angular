import * as moment from 'moment';

class EventBase {
  constructor(public source: string, public value: any) {}
}

export class AngularEvent extends EventBase {}
export class HtmlEvent extends EventBase {}
export class LogEvent extends EventBase {
  public datetime: string;
  constructor(public source: string, public value: any) {
    super(source, value);
    this.datetime = moment().format('DD-MMM-YY hh:mm:ss.SSS');
  }
}
export type EventCallbackFunction = (event: EventBase) => void;
