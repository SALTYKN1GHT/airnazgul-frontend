import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  orderDetails: any[] = [
    {
      departure: { dest_code: 'EDO', settlement: 'Edoras', realm: 'Rohan', imagePath: '' },
      arrival: { dest_code: 'LHR', settlement: 'Linhir', realm: 'Gondor' },
      departureTime: '13.00',
      arrivalTime: '15.50',
      date: '2023.09.12',
      distance: 987,
      flightTime: '2hrs 50mins',
      price: 123,
      imagePathDeparture: '',
      imagePathArrival: '',
    },
    {
      departure: { dest_code: 'LHR', settlement: 'Linhir', realm: 'Gondor' },
      arrival: { dest_code: 'EDO', settlement: 'Edoras', realm: 'Rohan' },
      departureTime: '17.00',
      arrivalTime: '19.50',
      date: '2023.09.15',
      distance: 987,
      flightTime: '2hrs 50mins',
      price: 123,
      imagePathDeparture: '',
      imagePathArrival: '',
    },
  ];

  passDetails: any[] = [
    {
      imagePath: '',
      realm: 'Gondor',
      settlements: ['Minas Tirith', 'Linhir', 'Argonath', 'Dol Amroth'],
      price: 500,
    },
    {
      imagePath: '',
      realm: 'Rhovanion',
      settlements: ['Dol Guldur', 'Calas Galadhon'],
      price: 500,
    },
  ];

  totalPrice: number = 0;

  constructor() {}

  ngOnInit() {
    this.fetchOrderDetails();

    this.calculateTotalPrice();

    for (let orderDetail of this.orderDetails) {
      orderDetail.imagePathDeparture = `assets/images/dest_profile_pics/${this.convertToUnderscoreFormat(
        orderDetail.departure.settlement
      )}.png`;
      orderDetail.imagePathArrival = `assets/images/dest_profile_pics/${this.convertToUnderscoreFormat(
        orderDetail.arrival.settlement
      )}.png`;
    }

    for (let passDetail of this.passDetails) {
      passDetail.imagePath = `assets/images/pass_cards/${passDetail.realm.toLowerCase()}.png`;
    }
  }

  convertToUnderscoreFormat(text: string) {
    console.log(text);
    const result = text.toLowerCase().replace(/\s+/g, '-');
    console.log(result);

    return result;
  }

  fetchOrderDetails() {}

  increaseQuantity(orderDetails: any) {}

  decreaseQuantity(orderDetails: any) {}

  deleteOrder(orderDetails: any) {
    const index = this.orderDetails.indexOf(orderDetails);
    if (index > -1) {
      this.orderDetails.splice(index, 1);
    }
  }

  submitOrder() {}

  calculateTotalPrice() {
    for (let orderDetail of this.orderDetails) {
      this.totalPrice += orderDetail.price;
    }
    for (let passDetail of this.passDetails) {
      this.totalPrice += passDetail.price;
    }
  }
}
