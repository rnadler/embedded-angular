import {Component} from '@angular/core';
import {NgInterop} from './ng.interop';
import {HtmlEvent} from './event.types';

@Component({
  selector: 'app-root',
  template: `<button id="toggleRemoveButton" class="btn" (click)="toggleRemoveButton()">Toggle Remove Button</button>
  &nbsp;<span id="toggleStatus">Remove button is {{showRemove ? 'enabled' : 'disabled'}}.</span>
  <br><br>
  <div>
    <strong>Html Event:</strong><span id="htmlEventData"> {{htmlEventData}}</span>
  </div>`
})
export class AppComponent {
  showRemove = true;
  htmlEventData = '';

  constructor(private ngInterop: NgInterop) {
    ngInterop.subscribeToClass(NgInterop.HTML_EVENT, (event: HtmlEvent) => {
      const msg = `Got HtmlEvent source=${event.source} value=${event.value}`;
      ngInterop.publishToClass(NgInterop.LOG_EVENT, 'AppComponent', msg);
      this.htmlEventData = event.value + ' from ' + event.source;
    });
  }

  toggleRemoveButton() {
    this.showRemove = !this.showRemove;
    this.ngInterop.publishToClass(NgInterop.ANGULAR_EVENT, 'AppComponent.toggleRemove',
      this.showRemove ? 'showRemove' : 'hideRemove');
  }
}
