import {Injectable, NgZone} from '@angular/core';
import {AngularEvent, EventCallbackFunction, HtmlEvent} from './event.types';
import {MessagingService} from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class NgInterop {
  public static readonly ANGULAR_EVENT: string = 'AngularEvent';
  public static readonly HTML_EVENT: string = 'HtmlEvent';
  private typeClassMap: any = {};
  private readonly initCallback: any;

  constructor(private ngZone: NgZone, private messagingService: MessagingService) {
    this.typeClassMap[NgInterop.ANGULAR_EVENT] =  AngularEvent;
    this.typeClassMap[NgInterop.HTML_EVENT] =  HtmlEvent;
    this.initCallback = window['NgInteropInitCallback'];
    window['ngInterop'] = this;
    this.init();
  }
  private init() {
    if (!this.initCallback) {
      console.warn('NgInterop.init: No NgInteropInitCallback found!');
      return;
    }
    this.initCallback();
  }
  public subscribeToClass(className: string, callBack: EventCallbackFunction): any {
    const self = this;
    this.ngZone.run(() => {
      self.messagingService.of(self.typeClassMap[className]).subscribe(callBack);
    });
  }
  public publishToClass(className: string, source: string, value: string): any {
    const self = this;
    this.ngZone.run(() => {
      self.messagingService.publish(new self.typeClassMap[className](source, value));
    });
  }
}
