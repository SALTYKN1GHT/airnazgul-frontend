import { Destination, ShortDest } from './destination';

export interface Ticket {
  departure: Destination;
  arrival: Destination;
  travelDate: string;
  departureHour: string;
  arrivalHour: string;
  distance: number;
  flightTime: string;
  price: number;
}
export interface Pass {
  coverImg: string;
  destList: [ShortDest, ShortDest][];
  price: number;
  type: 'pass';
}
export type Cart = CartItem[];

export type CartItem = {
  type: 'ticket';
  qty: number;
  ticket: Ticket;
};
