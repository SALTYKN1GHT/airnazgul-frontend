import { Injectable } from '@angular/core';
import { Cart, CartItem, Pass, Ticket } from 'src/interfaces/ticket';
import groupBy from 'lodash.groupby';
import isEqual from 'lodash.isequal';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  static storageKey: string = 'cart';
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    JSON.parse(window.localStorage.getItem(CartService.storageKey) || '[]')
  );
  constructor() {}
  public getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addTicket(ticket: Ticket): void {
    const cart: Cart = JSON.parse(
      window.localStorage.getItem(CartService.storageKey) || '[]'
    );
    console.log(cart);
    const newTicket: CartItem = {
      type: 'ticket',
      qty: 1,
      ticket: ticket,
    };
    const existingItemIndex: number = cart.findIndex((item) => {
      console.log(ticket, item.ticket);
      return isEqual(ticket, item.ticket);
    });
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].qty++;
    } else {
      cart.push(newTicket);
    }
    window.localStorage.setItem(CartService.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }
  removeTicket(ticket: Ticket, every?: boolean) {
    console.log('removeTicket() fired');
    let cart: Cart = JSON.parse(
      window.localStorage.getItem(CartService.storageKey) || '[]'
    );
    const existingItemIndex: number = cart.findIndex((item) => {
      console.log(ticket, item.ticket);
      return isEqual(ticket, item.ticket);
    });
    if (existingItemIndex < 0) return;
    if (every) {
      cart.splice(existingItemIndex, 1);
    } else if (cart[existingItemIndex].qty >= 1) {
      cart[existingItemIndex].qty--;
      if (cart[existingItemIndex].qty === 0) {
        cart = cart.filter((item) => item.qty != 0);
      }
    }
    console.log(cart);
    window.localStorage.setItem(CartService.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  // addPass(pass: Pass) {
  //   const cart: Cart = JSON.parse(
  //     window.localStorage.getItem(CartService.storageKey) || '[]'
  //   );
  //   const newPass: CartItem = { ...pass };
  //   window.localStorage.setItem(
  //     CartService.storageKey,
  //     JSON.stringify([...cart, newPass])
  //   );
  // }
  // getCart() {
  //   const cart: Cart = JSON.parse(
  //     window.localStorage.getItem(CartService.storageKey) || '[]'
  //   );
  //   return cart;
  // }
  groupCart() {
    const cart: Cart = JSON.parse(
      window.localStorage.getItem(CartService.storageKey) || '[]'
    );
    const groupedCart = groupBy(cart, (item) => {
      return item.type;
    });
  }
}
