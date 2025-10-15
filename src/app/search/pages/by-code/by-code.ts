import { Component, computed, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService } from '../../services/search-service';
import { Subscription } from 'rxjs';
import { PATHS } from '../../../utils/paths';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-by-code',
  imports: [RouterLink, DecimalPipe, TitleCasePipe],
  templateUrl: './by-code.html',
})
export default class ByCode implements OnDestroy {
  paths = PATHS;
  activatedRoute = inject(ActivatedRoute);
  searchService = inject(SearchService);
  country = computed(() => this.searchService.countries()[0]);
  isLoading = computed(() => this.searchService.isLoading());
  hasError = computed(() => this.searchService.hasError());

  private routeSubscription?: Subscription;

  constructor() {
    this.routeSubscription = this.activatedRoute.url.subscribe((url) => {
      // Search country by code when the route changes
      this.searchService.searchCountries('alpha', url[1].path);
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }
}
