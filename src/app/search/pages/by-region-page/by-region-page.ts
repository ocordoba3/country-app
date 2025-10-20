import { Component, computed, inject, signal } from '@angular/core';
import { Table } from '../../../shared/components/table/table';
import { SearchService } from '../../services/search-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [Table],
  templateUrl: './by-region-page.html',
})
export default class ByRegionPage {
  tabs = ['Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania'];
  searchService = inject(SearchService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  countries = computed(() => this.searchService.countries());
  selectedTab = signal<string>(this.tabs[0]);

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const region = params['q'];
      if (region && this.tabs.includes(region)) {
        this.selectedTab.set(region);
        this.searchService.searchCountries('region', region);
      } else {
        this.loadDefaultRegion();
      }
    });
  }

  loadDefaultRegion() {
    this.selectedTab.set(this.tabs[0]);
    this.searchService.searchCountries('region', this.selectedTab());
  }

  handleSearch(region: string) {
    this.selectedTab.set(region);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { q: region || null },
      queryParamsHandling: 'merge', // Mantener otros query params existentes
    });
    this.searchService.navigationHistory.set('region', region);
  }
}
