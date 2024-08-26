import { Injectable } from '@angular/core';
import { Destination } from 'src/interfaces/destination';
import { Ticket } from 'src/interfaces/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor() {}

  genTicket(
    fromLoc: Destination,
    toLoc: Destination,
    date: string,
    departureTime: number
  ): Ticket {
    const distance = this.calcDistance(fromLoc, toLoc);
    const flightTime = this.calcFlightTime(this.calcDistance(fromLoc, toLoc));
    const arrivalHour = departureTime + flightTime;
    let ticket: Ticket = {
      departure: fromLoc,
      arrival: toLoc,
      travelDate: new Date(date).toISOString(),
      departureHour: this.parseToHourMin(departureTime),
      arrivalHour: this.parseToHourMin(arrivalHour),
      distance: distance,
      flightTime: this.parseToHourMin(flightTime),
      price: +(distance * 1.5).toFixed(0),
    };
    return ticket;
  }
  calcDistance(destA: Destination, destB: Destination): number {
    const dX: number = destA.x_coordinate - destB.x_coordinate;
    const dY: number = destA.y_coordinate - destB.y_coordinate;
    return +Math.sqrt(dX ** 2 + dY ** 2).toFixed(2);
  }
  calcFlightTime(distance: number): number {
    return +(distance / 120).toFixed(2);
  }

  parseToHourMin(decimalHour: number): string {
    const hours: number = Math.floor(decimalHour);
    const mins: number = Math.round((decimalHour - hours) * 60);
    const timeString: string = `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}`;
    return timeString;
  }
}
