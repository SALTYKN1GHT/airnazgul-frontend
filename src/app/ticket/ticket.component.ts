import { Component, Input } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { parseToProfPicsNames } from 'src/utils/util-functions';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() public ticket: Ticket & { qty?: number };
  @Input() public seats: string;
  @Input() public cartView: boolean = false;
  public imagePathDeparture: string = '';
  public imagePathArrival: string = '';
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.imagePathDeparture = `assets/images/dest_profile_pics/${parseToProfPicsNames(
      this.ticket.departure.settlement
    )}.png`;
    this.imagePathArrival = `assets/images/dest_profile_pics/${parseToProfPicsNames(
      this.ticket.arrival.settlement
    )}.png`;
  }
  onClickBuy() {
    const { qty: _, ...rest } = this.ticket;
    this.cartService.addTicket(rest);
  }
  onClickSubtract() {
    const { qty: _, ...rest } = this.ticket;
    this.cartService.removeTicket(rest);
  }
  onClickRemove() {
    const { qty: _, ...rest } = this.ticket;
    this.cartService.removeTicket(rest, true);
  }
}
