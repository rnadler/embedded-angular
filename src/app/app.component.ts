import {Component} from '@angular/core';
import {MessagingService} from './messaging.service';
import {AngularEvent, HtmlEvent} from './event.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'embedded-angular';
  showRemove = true;

  constructor(private messagingService: MessagingService) {
    messagingService.of(HtmlEvent).subscribe((be) =>
      console.log(`AppComponent: HtmlEvent source=${be.source} value=${be.value}`));
  }

  toggleRemoveLink() {
    this.showRemove = !this.showRemove;
    this.messagingService.publish(new AngularEvent('AppComponent.showRemove',
      this.showRemove ? 'endEdit' : 'startEdit'));
  }
}
