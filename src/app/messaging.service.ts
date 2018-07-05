
// http://www.processinginfinity.com/weblog/2016/08/18/MessageBus-Pattern-in-Angular2-TypeScript

import {map, filter, observeOn} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';

interface Message {
  channel: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messageSubject: Subject<Message> = new Subject<Message>();

  public publish<T>(message: T): void {
    const channel = (<any>message.constructor).name;
    this.messageSubject.next({ channel: channel, data: message });
  }

  public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
    const channel = (<any>messageType).name;
    return this.messageSubject.pipe(
      observeOn(async),
      filter(m => m.channel === channel),
      map(m => m.data));
  }
}
