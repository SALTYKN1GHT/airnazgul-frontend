import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrls: ['./pass-list.component.scss']
})
export class PassListComponent implements OnInit {
  rohanDestinations: any[] = [];
  gondorDestinations: any[] = [];
  enedwaithDestinations: any[] = [];
  eriadorDestinations: any[] = [];
  rhovanionDestinations: any[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.fetchDestinations();
  }

  fetchDestinations() {
    this.httpService.get('destinations')
      .subscribe((data: any) => {
        this.groupDestinationsByRealm(data);
      });
  }

  groupDestinationsByRealm(destinations: any[]): void {
    for (const destination of destinations) {
      if (destination.realm === 'Rohan') {
        this.rohanDestinations.push(destination.settlement);
      } else if (destination.realm === 'Gondor') {
        this.gondorDestinations.push(destination.settlement);
      } else if (destination.realm === 'Enedwaith') {
        this.enedwaithDestinations.push(destination.settlement);
      } else if (destination.realm === 'Eriador') {
        this.eriadorDestinations.push(destination.settlement);
      } else if (destination.realm === 'Rhovanion') {
        this.rhovanionDestinations.push(destination.settlement);
      }
    }
  }
}