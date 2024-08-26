import { Component, Input, OnInit } from '@angular/core';
import { Destination, ShortDest } from 'src/interfaces/destination';
import { DestinationService } from 'src/services/destination.service';
import { parseToProfPicsNames } from 'src/utils/util-functions';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
})
export class PassComponent implements OnInit {
  @Input() realm: string = '';
  @Input() settlements: Destination[] = [];
  public coverImgPath: string = '';
  public destList: [ShortDest, ShortDest][] = [];
  public discountRate: number = 0.9;
  public passPrice: number;

  constructor(private destinationService: DestinationService) {}
  ngOnInit() {
    this.coverImgPath = `../../../assets/images/pass_cards/${this.realm.toLowerCase()}.png`; // Realm cover image path
    this.destList = this.createPassDestinations(this.settlements);
    this.passPrice = +this.calcPrice(this.settlements).toFixed(0);
  }
  createPassDestinations(destinations: Destination[]) {
    const results: [ShortDest, ShortDest][] = [];
    for (let i: number = 0; i < destinations.length - 1; i++) {
      const fromImgPath = `../../../assets/images/dest_profile_pics/${parseToProfPicsNames(
        destinations[i].settlement
      )}.png`;
      const toImgPath = `../../../assets/images/dest_profile_pics/${parseToProfPicsNames(
        destinations[i + 1].settlement
      )}.png`;
      results.push([
        { destCode: destinations[i].dest_code, imgUrl: fromImgPath, title: '' },
        {
          destCode: destinations[i + 1].dest_code,
          imgUrl: toImgPath,
          title: '',
        },
      ]);
    }
    results.push([
      {
        destCode: destinations.at(-1)!.dest_code,
        imgUrl: `../../../assets/images/dest_profile_pics/${parseToProfPicsNames(
          destinations.at(-1)!.settlement
        )}.png`,
        title: '',
      },
      {
        destCode: destinations[0].dest_code,
        imgUrl: `../../../assets/images/dest_profile_pics/${parseToProfPicsNames(
          destinations[0].settlement
        )}.png`,
        title: '',
      },
    ]);

    // destinations.at(-1) === destinations[destinations.length-1]
    /* 
    results: [DestCode, DestCode][] = 
    [
    [
        { destCode: "EDO", imgUrl: "nyc.jpg", title: "New York City" },
        { destCode: "LAX", imgUrl: "lax.jpg", title: "Los Angeles" }
    ],
    [
        { destCode: "LON", imgUrl: "lon.jpg", title: "London" },
        { destCode: "PAR", imgUrl: "par.jpg", title: "Paris" }
    ] 
  ],*/
    return results;
  }

  calcPrice(settlements: Destination[]): number {
    let price: number = 0;
    for (let i = 0; i < settlements.length - 1; i++) {
      price +=
        this.destinationService.calcDistance(
          settlements[i],
          settlements[i + 1]
        ) * this.discountRate;
    }
    price +=
      this.destinationService.calcDistance(
        settlements.at(-1)!,
        settlements[0]
      ) * this.discountRate;
    return price;
  }
}
