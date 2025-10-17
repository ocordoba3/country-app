import { Component, ElementRef, input } from '@angular/core';
import { Country } from '../../../search/interfaces/country';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PATHS } from '../../../utils/paths';

@Component({
  selector: 'app-table',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './table.html',
})
export class Table {
  paths = PATHS;
  countries = input<Country[]>([]);
  isLoading = input<boolean>(false);
  hasError = input<boolean>(false);
  inputElement = input<ElementRef<any> | undefined>(undefined);

  searchNow() {
    this.inputElement()!.nativeElement.value = '';
    this.inputElement()?.nativeElement?.focus();
  }
}
