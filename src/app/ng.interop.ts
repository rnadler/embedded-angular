import {Injectable, NgZone} from '@angular/core';
import {AngularEvent, HtmlEvent} from './event.types';
import {MessagingService} from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class NgInterop {
  private typeMap: any = {};
  private readonly initCallback: any;

  constructor(private ngZone: NgZone, private messagingService: MessagingService) {
    this.typeMap['AngularEvent'] =  AngularEvent;
    this.typeMap['HtmlEvent'] =  HtmlEvent;
    this.initCallback = window['NgInteropInitCallback'];
    window['ngInterop'] = {service: this, zone: this.ngZone};
    this.init();
  }
  private init() {
    if (!this.initCallback) {
      console.warn('NgInterop.init: No NgInteropInitCallback found!');
      return;
    }
    this.initCallback();
  }
  public ofClass(className: string): any {
    return this.messagingService.of(this.typeMap[className]);
  }
  public publishClass(className: string, source: string, value: string): any {
    this.messagingService.publish(new this.typeMap[className](source, value));
  }
}
