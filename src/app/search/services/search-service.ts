import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CountryResp, SearchKey } from '../interfaces/country-resp';
import { mapCountriesResponse } from '../utils/search-mapper';
import { Country } from '../interfaces/country';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private URL_BASE = 'https://restcountries.com/v3.1';

  isLoading = signal(false);
  hasError = signal(false);
  countries = signal<Country[]>([]);

  clearCountries() {
    this.countries.set([]);
    this.hasError.set(false);
  }

  searchCountries(key: SearchKey, queryValue: string) {
    this.isLoading.set(true);
    this.http
      .get<CountryResp[]>(`${this.URL_BASE}/${key}/${queryValue.toLowerCase()}`)
      .pipe(map(mapCountriesResponse))
      .subscribe({
        next: (countries) => {
          this.countries.set(countries);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }
}
