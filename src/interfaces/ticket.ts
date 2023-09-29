import { Destination } from './destination';

export interface TicketViewModel {
  departure: Destination | any;
  arrival: Destination | any;
  departureTime: string | any;
  arrivalTime: string | any;
  date: string;
  distance: number;
  flightTime: string;
  price: number;
}
