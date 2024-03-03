import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Destination } from 'src/interfaces/destination';
import { SearchInput } from 'src/interfaces/search-input';
import { HttpService } from 'src/services/http.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-destinations-input',
  templateUrl: './destinations-input.component.html',
  styleUrls: ['./destinations-input.component.scss'],
})
export class DestinationsInputComponent implements OnInit {
  public displayTicketsTitle: boolean = true;
  public destination: Destination[] = [];
  public filteredDestination: Destination[] = [];
  public blacklistedDates: Date[] = [];
  public returnChecked: boolean = true;
  public selectedDestination: [Destination | null, Destination | null] = [
    null,
    null,
  ];
  public selectedDates: [Date | null, Date | null] = [null, null];
  public noReturn: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.httpService.get('destinations').subscribe((data) => {
      this.destination = data as any;
      this.filteredDestination = data as any;
    });
  }
  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params) => {
      console.log(params);
    });
    this.router.events.subscribe((event) => {
      console.log('Router events subscribe fired!');

      if (this.router.url === '/') {
      } else {
        this.displayTicketsTitle = false;
      }
    });
  }

  getRidOfMordor() {
    return this.filteredDestination.filter((item) => {
      return !item.realm.includes('Mordor');
    });
  }

  getCheckStatus(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.returnChecked = !target.checked;
  }

  getDestinations(destination: Destination, id: number) {
    this.selectedDestination[id] = destination;
    this.noReturn = destination.realm.includes('Mordor');
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
      from: this.selectedDestination[0]?.id,
      to: this.selectedDestination[1]?.id,
      departure: arr[0],
      return: arr[1],
      checkstatus: !this.returnChecked,
    };

    this.router.navigate(['ticket-list'], { queryParams: searchValue });
  }

  addItem(id: number): void {
    this.filteredDestination = this.destination.filter((d) => d.id != id);
  }
  blackListDate(date: Date, id: number): void {
    this.blacklistedDates.push(date);
    this.selectedDates[id] = date;
    console.log(this.selectedDates);
  }
  validate(event: Event): void {
    const date = (event.target as HTMLInputElement).value;
    if (this.blacklistedDates.includes(new Date(date))) {
      (event.target as HTMLInputElement).value = '';
    }
  }
}
