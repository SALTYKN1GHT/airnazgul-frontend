import { Component, Input } from '@angular/core';
import { TicketViewModel } from '../../interfaces/ticket';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() public inputTicket: TicketViewModel;

  faShoppingCart = faShoppingCart;
  imagePathDeparture: string = '';
  imagePathArrival: string = '';

  ngOnInit() {
    this.imagePathDeparture = `assets/images/dest_profile_pics/shire.png`;
    this.imagePathArrival = `assets/images/dest_profile_pics/${this.convertToUnderscoreFormat(
      this.inputTicket.arrival.settlement
    )}.png`;
  }

  convertToUnderscoreFormat(text: string) {
    const result = text.toLowerCase().replace(/\s+/g, '-');
    console.log(result);

    return result;
  }
}
