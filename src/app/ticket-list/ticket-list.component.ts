import { Component } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent {
  public returnStatus: boolean = false;
  public departures: Ticket[] = [];
  public returns: Ticket[] = [];
  private morningHours: number[] = [4.1, 4.4, 5.4, 5.9, 6.3, 6.8, 7.2, 7.6];
  private beforenHours: number[] = [8.1, 8.5, 9.3, 9.7, 10.2, 10.6, 11.3, 11.8];
  private afternHours: number[] = [
    12.2, 12.7, 13.1, 13.5, 14.3, 14.8, 15.2, 15.4,
  ];
  private eveningHours: number[] = [
    16.3, 16.8, 17.5, 17.7, 18.1, 18.6, 19.2, 19.6,
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService
  ) {
    this.activatedRoute.queryParams.subscribe(
      async (input: Record<string, string>) => {
        this.departures = [];
        this.returns = [];
        // Get "fromLoc" destination details from backend
        const from = await fetch(
          `${environment.apiURL}/api/destinations/${input['fromLoc']}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        const fromJSON = await from.json();

        // Get "toLoc" destination details from backend
        const to = await fetch(
          `${environment.apiURL}/api/destinations/${input['toLoc']}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        const toJSON = await to.json();

        let newTicket: Ticket = ticketService.genTicket(
          fromJSON,
          toJSON,
          input['departureDate'],
          this.morningHours[
            Math.floor(Math.random() * this.morningHours.length)
          ]
        );
        let newTicket2: Ticket = ticketService.genTicket(
          fromJSON,
          toJSON,
          input['departureDate'],
          this.beforenHours[
            Math.floor(Math.random() * this.beforenHours.length)
          ]
        );

        this.departures.push(newTicket);
        this.departures.push(newTicket2);

        //Return ticket creation if there is return
        if (input['checkstatus']) {
          this.returnStatus = true;
          let newTicket: Ticket = ticketService.genTicket(
            toJSON,
            fromJSON,
            input['departureDate'],
            this.afternHours[
              Math.floor(Math.random() * this.afternHours.length)
            ]
          );
          let newTicket2: Ticket = ticketService.genTicket(
            toJSON,
            fromJSON,
            input['departureDate'],
            this.eveningHours[
              Math.floor(Math.random() * this.eveningHours.length)
            ]
          );
          this.returns.push(newTicket);
          this.returns.push(newTicket2);
        }
      }
    );
  }
}
