import {Component} from '@angular/core';
import {LogEvent} from './event.types';
import {NgInterop} from './ng.interop';

@Component({
  selector: 'app-log-component',
  template: `<span id="logComponent">Log events:</span>
  <ul>
    <li *ngFor="let event of logEvents">
      {{ event }}
    </li>
  </ul>`
})
export class LogComponent {
  logEvents: Array<string> = [];
  constructor(private ngInterop: NgInterop) {
    ngInterop.subscribeToClass(NgInterop.LOG_EVENT, (event: LogEvent) => {
      this.logEvents.push(event.datetime + ' [' + event.source + ']: ' + event.value);
    });
  }
}
