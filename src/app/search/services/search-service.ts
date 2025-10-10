import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country, SearchKey } from '../interfaces/search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);

  searchCountries(key: SearchKey, queryValue: string) {
    return this.http.get<Country[]>(
      `https://restcountries.com/v3.1/${key}/${queryValue.toLowerCase()}`
    );
  }
}
