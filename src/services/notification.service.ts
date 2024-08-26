import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // private subject: BehaviorSubject<SearchInput> =
  //   new BehaviorSubject<SearchInput>({});
  // public searchInputListener$: Observable<SearchInput> =
  //   this.subject.asObservable();
  // private ticketListSubject: BehaviorSubject<boolean> =
  //   new BehaviorSubject<boolean>(false);
  // public ticketListListener$: Observable<boolean> =
  //   this.ticketListSubject.asObservable();
  // constructor() {
  //   console.log('service const');
  // }
  // sendData(searchInput: SearchInput) {
  //   this.subject.next(searchInput);
  // }
  // setTicketListCompleted(state: boolean) {
  //   this.ticketListSubject.next(state);
  // }
}
