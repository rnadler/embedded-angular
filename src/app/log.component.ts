import {Component} from '@angular/core';
import {LogEvent} from './event.types';
import {NgInterop} from './ng.interop';

@Component({
  selector: 'app-log-component',
  styles: [`
    .scrollDiv { height:200px; overflow-y: scroll; }
    .borderDiv {border-style: inset;}
  `],
  template: `<span id="logComponent">Events log (latest on top):</span>
  <div class="scrollDiv borderDiv">
    <ul>
      <li *ngFor="let event of logEvents">
        {{ event }}
      </li>
    </ul>
  </div>`
})
export class LogComponent {
  logEvents: Array<string> = [];
  constructor(private ngInterop: NgInterop) {
    ngInterop.subscribeToClass(NgInterop.LOG_EVENT, (event: LogEvent) => {
      this.logEvents.unshift(event.datetime + ' [' + event.source + ']: ' + event.value);
    });
  }
}
