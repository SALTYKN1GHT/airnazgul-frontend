import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Calendar } from 'src/interfaces/calendar';
import { CalendarBuilderService } from 'src/services/calendar-builder.service';
import { DisableDatesService } from 'src/services/disable-dates.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent
  implements OnInit, AfterViewChecked, AfterViewInit
{
  @Input() public disabledDates: Date[] = [];
  @Input() public disabled: boolean = false;
  @Input() public intialValue: Date | undefined = undefined;
  @Output('onSelect') public change = new EventEmitter<Date>();
  @ViewChild('dateInputField')
  public dateInputField: ElementRef<HTMLInputElement>;
  @ViewChild('calendarContainer')
  public calendarContainer: ElementRef<HTMLDivElement>;
  public calendar: Calendar = { previous: [], current: [], next: [] };
  public calendarVisible: boolean = false;
  public month: string = '';
  public monthIndex: number = 0;
  public year: string = '';
  public monthList: string[] = [];
  public yearList: string[] = [];
  public yearVisible: boolean = false;
  public monthVisible: boolean = false;
  public dayVisible: boolean = true;
  public actualDate: string = '';
  constructor(
    private calendarBuilder: CalendarBuilderService,
    private disabledDatesService: DisableDatesService
  ) {}
  ngAfterViewInit(): void {
    document.addEventListener('click', (event: MouseEvent) => {
      const clicktarget = event.target as HTMLDivElement;
      if (
        !this.isDescendant(this.calendarContainer?.nativeElement, clicktarget)
      ) {
        this.calendarVisible = false;
      }
    });
  }
  ngAfterViewChecked(): void {
    this.onDisable();
  }
  ngOnInit() {
    // this.disabledDatesService.clearDates();
    this.disabledDates = [];
    const date = new Date();
    this.month = date.toLocaleString('en-US', { month: 'long' });
    this.monthIndex = date.getMonth();
    this.year = date.toLocaleString('en-US', { year: 'numeric' });
    this.monthList = this.genList(12, 'month');
    this.yearList = this.genList(12, 'year');
    this.calendar = this.calendarBuilder.buildMonth(
      date.getFullYear(),
      date.getMonth()
    );
    this.selectDate(this.intialValue);
    this.onDisable();
  }
  genList(n: number, input: 'year' | 'month') {
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();
    const list: string[] = [];
    for (let i: number = 0; i < n; i++) {
      // Generate years
      if (input === 'year') {
        list.push(
          new Date(actualYear + i, 0).toLocaleString('en-US', {
            year: 'numeric',
          })
        );
        // Generate months
      } else {
        list.push(new Date(1970, i).toLocaleString('en-US', { month: 'long' }));
      }
    }
    return list;
  }
  onSwitchMonth() {
    this.dayVisible = false;
    this.monthVisible = true;
    this.yearVisible = false;
  }
  onSwitchYear() {
    this.dayVisible = false;
    this.monthVisible = false;
    this.yearVisible = true;
  }
  onMonthClick(item: string, i: number) {
    this.calendar = this.calendarBuilder.buildMonth(+this.year, i);
    this.onDisable();
    this.month = item;
    this.monthIndex = i;
    this.monthVisible = false;
    this.yearVisible = false;
    this.dayVisible = true;
  }

  onYearClick(item: string) {
    this.year = item;
    this.monthVisible = true;
    this.yearVisible = false;
    this.dayVisible = false;
  }
  onDayClick(item: { value: number; disabled: boolean }) {
    const date = new Date(+this.year, this.monthIndex, item.value);
    this.selectDate(date);
  }
  selectDate(dateValue: Date | undefined) {
    this.disabledDatesService.removeDate(new Date(this.actualDate));
    const date = dateValue;
    if (!date) {
      return;
    }
    this.actualDate = date
      .toLocaleString('hu-HU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('.', '')
      .replaceAll(' ', '-');
    this.disabledDatesService.addDate(date);
    this.change.emit(date);
  }
  onInputFieldClick() {
    this.calendarVisible = !this.calendarVisible;
  }
  onDisable() {
    const currentYear = +this.year;
    const currentMonth = this.monthIndex;
    const filteredDates = this.disabledDatesService
      .getDates()
      .filter((item) => {
        return (
          item.getFullYear() === currentYear && item.getMonth() === currentMonth
        );
      })
      .map((item) => item.getDate());

    this.calendar.current = this.calendar.current.map((item) => {
      return {
        value: item.value,
        disabled: filteredDates.includes(item.value),
      };
    });
  }
  isDescendant(ancestor?: HTMLElement, child?: ParentNode | null): boolean {
    if (!child || !ancestor) {
      // If the child element doesn't exist, it can't be a descendant.
      return false;
    }

    if (child === ancestor) {
      // If the child is the same as the ancestor, it is a descendant.
      return true;
    }

    // Recursively check the parent of the current child element.
    return this.isDescendant(ancestor, child.parentNode);
  }
}
