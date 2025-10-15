import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { SearchKey } from '../../../search/interfaces/country-resp';
import { SearchService } from '../../../search/services/search-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { PATHS } from '../../../utils/paths';

@Component({
  selector: 'app-country-list',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList implements OnDestroy {
  paths = PATHS;
  activatedRoute = inject(ActivatedRoute);
  searchService = inject(SearchService);
  searchKey = input<SearchKey>('region');
  countries = computed(() => this.searchService.countries());
  isLoading = computed(() => this.searchService.isLoading());
  hasError = computed(() => this.searchService.hasError());
  inputElement = viewChild<ElementRef>('searchInput');

  private routeSubscription?: Subscription;

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

  searchRegion(query: string) {
    this.searchService.searchCountries(this.searchKey(), query);
  }

  handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchRegion(value);
  }

  searchNow() {
    this.inputElement()!.nativeElement.value = '';
    this.inputElement()?.nativeElement?.focus();
  }
}
