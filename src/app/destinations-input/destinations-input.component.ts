import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public destination: Destination[] = [];
  public filteredDestination: Destination[] = [];
  public blacklistedDates: Date[] = [];
  public returnChecked: boolean = true;
  public selectedDestination: [Destination | null, Destination | null] = [null, null];
  public selectedDates: [Date | null, Date | null] = [null, null];
  public noReturn: boolean = false;

  public searchInputListener$: Observable<SearchInput>;

  constructor(
    private httpService: HttpService,
    private searchInputService: NotificationService,
    private router: Router
  ) {
    httpService.get('destinations').subscribe(data => {
      this.destination = data as any;
      this.filteredDestination = data as any;
    });
  }
  ngOnInit(): void {
    this.searchInputListener$ = this.searchInputService.searchInputListener$;
  }

  getRidOfMordor() {
    return this.filteredDestination.filter(item => {
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
    const searchValue: SearchInput = {
      from: this.selectedDestination[0],
      to: this.selectedDestination[1],
      departure: this.selectedDates[0],
      return: this.selectedDates[1],
      checkstatus: !this.returnChecked,
    };

    this.searchInputService.sendData(searchValue);
    this.searchInputService.searchInputListener$.subscribe(res => console.log(res));

    this.router.navigate(['ticket-list']);
  }

  addItem(id: number): void {
    this.filteredDestination = this.destination.filter(d => d.id != id);
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
}
