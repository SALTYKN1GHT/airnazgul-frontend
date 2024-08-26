import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/interfaces/destination';
import { DestinationService } from 'src/services/destination.service';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrls: ['./pass-list.component.scss'],
})
export class PassListComponent implements OnInit {
  public gDestinations: [string, Destination[]][] = [];

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.destinationService.getDestinations().subscribe((destinations) => {
      //  'group' structure:
      // {
      //   Rohan: [
      //     {
      //       id: 13,
      //       realm: 'Rohan',
      //       settlement: 'Edoras',
      //       x_coordinate: 123,
      //       y_coordinate: 456,
      //       dest_code: 'EDO',
      //     },
      //     ...
      //   ],
      //  Edewaith: [...],
      //  ...
      // }
      const group = this.destinationService.groupByRealm(destinations);
      delete group['Mordor'];
      delete group['Erebor'];
      this.gDestinations = Object.entries(group);
    });
  }
}
