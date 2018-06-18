
// http://www.processinginfinity.com/weblog/2016/08/18/MessageBus-Pattern-in-Angular2-TypeScript

import {map, filter, observeOn} from 'rxjs/operators';
import {Injectable, NgZone} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';
import {AngularEvent, HtmlEvent} from './event.types';

interface Message {
  channel: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private typeMap: any = {};
  private messageSubject: Subject<Message> = new Subject<Message>();

  constructor(private ngZone: NgZone) {
    this.typeMap['AngularEvent'] =  AngularEvent;
    this.typeMap['HtmlEvent'] =  HtmlEvent;
    window['messagingService'] = {service: this, zone: this.ngZone};
  }
  public publish<T>(message: T): void {
    const channel = (<any>message.constructor).name;
    this.messageSubject.next({ channel: channel, data: message });
  }

  public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
    const channel = (<any>messageType).name;
    return this.messageSubject.pipe(
      observeOn(async),
      filter(m => m.channel === channel), map(m => m.data));
  }

  public ofClass(className: string): any {
    return this.of(this.typeMap[className]);
  }
  public publishClass(className: string, source: string, value: string): any {
    this.publish(new this.typeMap[className](source, value));
  }
}
