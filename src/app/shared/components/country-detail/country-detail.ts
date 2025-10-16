import { Component, computed, input } from '@angular/core';
import { Country } from '../../../search/interfaces/country';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  imports: [DecimalPipe, TitleCasePipe],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css',
})
export class CountryDetail {
  country = input<Country>();

  currency = computed(() =>
    this.country()?.currencies
      ? Object.values(this.country()!.currencies)
          .map((c) => c.name)
          .join(', ')
      : 'N/A'
  );
}
