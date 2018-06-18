class Event {
  constructor(public source: string, public value: any) {}
}

export class AngularEvent extends Event {}
export class HtmlEvent extends Event {}
