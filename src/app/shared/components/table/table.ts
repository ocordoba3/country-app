import { Component, ElementRef, input, signal } from '@angular/core';
import { Country } from '../../../search/interfaces/country';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PATHS } from '../../../utils/paths';
import { BooleanPipe } from '../../../pipes/boolean-pipe';
import { SortBy, SortOrder, SortPipe } from '../../../pipes/sort-pipe';
import { SortButtons } from '../sort-buttons/sort-buttons';

@Component({
  selector: 'app-table',
  imports: [TitleCasePipe, RouterLink, BooleanPipe, SortPipe, DecimalPipe, SortButtons],
  templateUrl: './table.html',
})
export class Table {
  paths = PATHS;
  countries = input<Country[]>([]);
  isLoading = input<boolean>(false);
  hasError = input<boolean>(false);
  inputElement = input<ElementRef<any> | undefined>(undefined);

  sortKey = signal<SortBy>('name');
  sortOrder = signal<SortOrder>('asc');

  toggleSort(key: SortBy) {
    switch (key) {
      case 'name': {
        if (this.sortKey() === 'name' && this.sortOrder() === 'asc') {
          this.sortOrder.set('desc');
          break;
        }
        if (this.sortKey() === 'name' && this.sortOrder() === 'desc') {
          this.sortKey.set(undefined);
          this.sortOrder.set(undefined);
          break;
        }
        this.sortKey.set('name');
        this.sortOrder.set('asc');
        break;
      }
      case 'population': {
        if (this.sortKey() === 'population' && this.sortOrder() === 'asc') {
          this.sortOrder.set('desc');
          break;
        }
        if (this.sortKey() === 'population' && this.sortOrder() === 'desc') {
          this.sortKey.set(undefined);
          this.sortOrder.set(undefined);
          break;
        }
        this.sortKey.set('population');
        this.sortOrder.set('asc');

        break;
      }
      default:
        this.sortKey.set(undefined);
        this.sortOrder.set(undefined);
    }
  }

  searchNow() {
    this.inputElement()!.nativeElement.value = '';
    this.inputElement()?.nativeElement?.focus();
  }
}
