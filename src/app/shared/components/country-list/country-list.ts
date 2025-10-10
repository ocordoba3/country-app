import { Component, inject, input, signal } from '@angular/core';
import { Country, SearchKey } from '../../../search/interfaces/search';
import { SearchService } from '../../../search/services/search-service';

@Component({
  selector: 'app-country-list',
  imports: [],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css',
})
export class CountryList {
  searchKey = input<SearchKey>('region');
  searchService = inject(SearchService);
  countries = signal<Country[]>([]);

  searchRegion(query: string) {
    this.searchService.searchCountries(this.searchKey(), query).subscribe((resp) => {
      this.countries.set(resp);
    });
  }

  handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchRegion(value);
  }
}
