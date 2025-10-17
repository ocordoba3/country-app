import { Component, computed, inject, signal } from '@angular/core';
import { Table } from '../../../shared/components/table/table';
import { SearchService } from '../../services/search-service';

@Component({
  selector: 'app-by-region-page',
  imports: [Table],
  templateUrl: './by-region-page.html',
})
export default class ByRegionPage {
  tabs = ['Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania'];
  searchService = inject(SearchService);
  countries = computed(() => this.searchService.countries());
  selectedTab = signal<string>(this.tabs[0]);

  constructor() {
    this.searchService.searchCountries('region', this.selectedTab());
  }

  handleSearch(region: string) {
    this.selectedTab.set(region);
    this.searchService.searchCountries('region', region);
  }
}
