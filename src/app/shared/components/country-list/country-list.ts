import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { SearchKey } from '../../../search/interfaces/country-resp';
import { SearchService } from '../../../search/services/search-service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PATHS } from '../../../utils/paths';
import { Table } from '../table/table';

@Component({
  selector: 'app-country-list',
  imports: [Table],
  templateUrl: './country-list.html',
})
export class CountryList implements OnDestroy {
  paths = PATHS;
  activatedRoute = inject(ActivatedRoute);
  searchService = inject(SearchService);
  searchKey = input<SearchKey>('region');
  inputValue = signal<string>('');
  countries = computed(() => this.searchService.countries());
  isLoading = computed(() => this.searchService.isLoading());
  hasError = computed(() => this.searchService.hasError());
  placeholder = computed(() => `Find countries by ${this.searchKey()}...`);
  inputElement = viewChild<ElementRef>('searchInput');

  private routeSubscription?: Subscription;

  debounceSearch = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.searchCountries(value);
    }, 500);

    onCleanUp(() => clearTimeout(timeout));
  });

  constructor() {
    this.routeSubscription = this.activatedRoute.url.subscribe(() => {
      // Clean countries and state when the route changes
      this.searchService.clearCountries();
      // Clear search input
      setTimeout(() => {
        if (this.inputElement()?.nativeElement) {
          this.inputElement()!.nativeElement.value = '';
        }
      }, 0);
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  searchCountries(query: string) {
    this.searchService.searchCountries(this.searchKey(), query);
  }

  searchNow() {
    this.inputElement()!.nativeElement.value = '';
    this.inputElement()?.nativeElement?.focus();
  }
}
