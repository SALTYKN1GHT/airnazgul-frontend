import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/interfaces/destination';
import { Cart, Ticket } from 'src/interfaces/ticket';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cartTickets: (Ticket & { qty: number })[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    // this.cartService.groupCart();
    this.cartService.getCart().subscribe((cart) => {
      this.cartTickets = [];
      for (const items of cart) {
        if (items.type === 'ticket') {
          this.cartTickets.push({ ...items.ticket, qty: items.qty });
        }
      }
    });
  }
}
