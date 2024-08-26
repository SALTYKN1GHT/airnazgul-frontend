import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from 'src/interfaces/destination';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-destinations-input',
  templateUrl: './destinations-input.component.html',
  styleUrls: ['./destinations-input.component.scss'],
})
export class DestinationsInputComponent implements OnInit {
  public displayTicketsTitle: boolean = true;
  public destinations: Destination[] = [];
  public filteredDestination: Destination[] = [];
  public blacklistedDates: Date[] = [];
  public isChecked: boolean;
  public selectedDestination: [Destination | null, Destination | null] = [
    null,
    null,
  ];
  public selectedDates: [Date | null, Date | null] = [null, null];
  public noReturn: boolean = false;
  public queryParams: {
    fromLoc: string | undefined;
    toLoc: string | undefined;
    departureDate: string | undefined;
    returnDate: string | undefined;
    returnChecked: boolean;
  };

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.httpService.get('destinations').subscribe((data) => {
      this.destinations = data as any;
      this.filteredDestination = data as any;
    });
  }
  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params) => {
      this.queryParams = params as any;
      if (params['checkstatus']) {
        this.isChecked = true;
      }
      if (!params['returnDate']) {
        this.noReturn = true;
      }
    });
    this.router.events.subscribe(() => {
      if (this.router.url === '/') {
      } else {
        this.displayTicketsTitle = false; // Hides "TICKETS" if we are not on the landing page
      }
    });
  }

  getRidOfMordor() {
    return this.filteredDestination.filter((item) => {
      return !item.realm.includes('Mordor');
    });
  }

  onReturnClick(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isChecked = target.checked;
  }

  getDestinations(destination: Destination, id: number) {
    this.selectedDestination[id] = destination;
    this.noReturn = destination.realm.includes('Mordor');
    this.isChecked = this.isChecked && !this.noReturn;
  }

  onSearch() {
    const arr = this.selectedDates.map((item) => {
      return item
        ?.toLocaleString('default', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replaceAll('.', '')
        .replaceAll(' ', '-');
    });
    const searchValue = {
      fromLoc: this.selectedDestination[0]?.id || this.queryParams.fromLoc,
      toLoc: this.selectedDestination[1]?.id || this.queryParams.toLoc,
      departureDate: arr[0],
      returnDate: arr[1],
      checkstatus: this.isChecked || this.queryParams.returnChecked,
    };
    if (
      !!searchValue.fromLoc &&
      !!searchValue.toLoc &&
      !!searchValue.departureDate
    ) {
      this.router.navigate(['ticket-list'], { queryParams: searchValue });
    }
  }

  addItem(id: number): void {
    this.filteredDestination = this.destinations.filter((d) => d.id != id);
  }
  blackListDate(date: Date, id: number): void {
    this.blacklistedDates.push(date);
    this.selectedDates[id] = date;
  }
  validate(event: Event): void {
    const date = (event.target as HTMLInputElement).value;
    if (this.blacklistedDates.includes(new Date(date))) {
      (event.target as HTMLInputElement).value = '';
    }
  }
  getDestinationById(id: string | undefined): Destination | undefined {
    if (!id) {
      return undefined;
    }
    const result = this.destinations.find((item) => item.id === +id);
    this.isChecked = this.isChecked && !this.noReturn;
    this.noReturn = !!result?.realm.includes('Mordor');
    return result;
  }
  getDate(date: string | undefined) {
    if (!date) {
      return undefined;
    }
    return new Date(date);
  }
}
