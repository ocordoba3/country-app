import { Component, computed, input } from '@angular/core';
import { Country } from '../../../search/interfaces/country';
import { DecimalPipe, I18nPluralPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  imports: [DecimalPipe, TitleCasePipe, I18nPluralPipe],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css',
})
export class CountryDetail {
  bordersMap = {
    '=0': 'no bordering countries',
    '=1': '1 bordering country',
    other: '# bordering countries',
  };

  country = input<Country>();

  currency = computed(() =>
    this.country()?.currencies
      ? Object.values(this.country()!.currencies)
          .map((c) => c.name)
          .join(', ')
      : 'N/A'
  );
}
