import {Component} from '@angular/core';
import {NgInterop} from './ng.interop';
import {HtmlEvent} from './event.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showRemove = true;
  htmlEventData = '';

  constructor(private ngInterop: NgInterop) {
    ngInterop.subscribeToClass(NgInterop.HTML_EVENT, (event: HtmlEvent) => {
      console.log(`AppComponent: HtmlEvent source=${event.source} value=${event.value}`);
      this.htmlEventData = event.value + ' from ' + event.source;
    });
  }

  toggleRemoveLink() {
    this.showRemove = !this.showRemove;
    this.ngInterop.publishToClass(NgInterop.ANGULAR_EVENT, 'AppComponent.showRemove',
      this.showRemove ? 'endEdit' : 'startEdit');
  }
}
