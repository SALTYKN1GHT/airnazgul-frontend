import { Component, OnInit } from '@angular/core';
import { TicketViewModel } from '../../interfaces/ticket';
import { NotificationService } from '../../services/notification.service';
import { SearchInput } from 'src/interfaces/search-input';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { Destination } from 'src/interfaces/destination';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  public departures: TicketViewModel[] = [];
  public returns: TicketViewModel[] = [];

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(
      async (input: Record<string, string>) => {
        const from = await fetch(
          `${environment.apiURL}/api/destinations/${input['from']}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        const fromJSON = await from.json();

        const to = await fetch(
          `${environment.apiURL}/api/destinations/${input['to']}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        const toJSON = await to.json();
        //departures
        let createdTicket: TicketViewModel = {
          departure: fromJSON,
          arrival: toJSON,
          departureTime: new Date(input['departure']),
          arrivalTime: new Date(input['return']),
          date: Date.now().toString(),
          distance: 258,
          flightTime: '2h 10m',
          price: 1000,
        };

        this.departures.push(createdTicket);

        if (input['checkstatus']) {
          //return
          let createdTicket: TicketViewModel = {
            departure: fromJSON,
            arrival: toJSON,
            departureTime: new Date(input['departure']),
            arrivalTime: new Date(input['return']),
            date: Date.now().toString(),
            distance: 258,
            flightTime: '2h 10m',
            price: 1000,
          };

          this.returns.push(createdTicket);
        }
        console.log(this.departures, this.returns);
      }
    );
  }

  ngOnInit(): void {
    // this.searchInputCompleted.subscribe(result => {
    //   if (result) {
    //     this.httpService
    //       .get<Destination[]>(
    //         `destinations/filter/${this.searchInput.from?.settlement}/${this.searchInput.to?.settlement}`
    //       )
    //       .subscribe(destinations => {
    //         this.generateTicketList(destinations);
    //       });
    //   }
    // });
  }

  public onClick(event: MouseEvent) {
    console.log('Component clicked');
  }

  // generateTicketList(searchInput: SearchInput) {
  //   if (this.searchInput.from == null || this.searchInput.to == null) {
  //     throw new Error('From or To parameter are null, please fill it correctly!');
  //   }

  //   //departures
  //   let createdTicket: TicketViewModel = {
  //     departure: searchInput.departure,
  //     arrival: destinations[1],
  //     departureTime: Date.now().toString(),
  //     arrivalTime: Date.now().toString(),
  //     date: Date.now().toString(),
  //     distance: 258,
  //     flightTime: '2h 10m',
  //     price: 1000,
  //   };

  //   this.departures.push(createdTicket);
  //   console.log(this.departures);

  //   if (this.searchInput.checkstatus) {
  //     //return
  //     let createdTicket: TicketViewModel = {
  //       departure: destinations[1],
  //       arrival: destinations[0],
  //       departureTime: Date.now().toString(),
  //       arrivalTime: Date.now().toString(),
  //       date: Date.now().toString(),
  //       distance: 258,
  //       flightTime: '2h 10m',
  //       price: 1000,
  //     };

  //     this.returns.push(createdTicket);
  //     console.log(this.returns);
  //   }
  // }
}
