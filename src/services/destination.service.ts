import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Destination } from 'src/interfaces/destination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  constructor(private httpService: HttpService) {}

  getDestinations(): Observable<Destination[]> {
    return this.httpService.get<Destination[]>('destinations');
  }

  groupByRealm(destinations: Destination[]) {
    const results: Record<string, Destination[]> = {};
    destinations.forEach((item) => {
      if (Object.keys(results).includes(item.realm)) {
        results[item.realm].push(item);
      } else {
        results[item.realm] = [item];
      }
    });
    return results;
  }
  calcDistance(destA: Destination, destB: Destination): number {
    const dX: number = destA.x_coordinate - destB.x_coordinate;
    const dY: number = destA.y_coordinate - destB.y_coordinate;
    return +Math.sqrt(dX ** 2 + dY ** 2).toFixed(2);
  }
  calcFlightTime(distance: number) {}
}
