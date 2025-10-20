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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
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
  router = inject(Router);
  searchService = inject(SearchService);
  searchKey = input<SearchKey>(null);
  inputValue = signal<string>('');

  countries = computed(() => this.searchService.countries());
  isLoading = computed(() => this.searchService.isLoading());
  hasError = computed(() => this.searchService.hasError());
  placeholder = computed(() => `Find countries by ${this.searchKey()}...`);
  inputElement = viewChild<ElementRef>('searchInput');

  private routeSubscription?: Subscription;

  // Effect para debounce de búsqueda
  debounceSearch = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      if (value) {
        this.handleSearch(value);
      }
    }, 500);

    onCleanUp(() => clearTimeout(timeout));
  });

  // Effect para inicializar suscripciones solo cuando searchKey tenga valor
  routeEffect = effect((onCleanUp) => {
    const currentSearchKey = this.searchKey();

    // Solo ejecutar si searchKey tiene un valor válido (no null)
    if (currentSearchKey) {
      // Suscripción combinada para detectar cambios de ruta y query params
      this.routeSubscription = combineLatest([
        this.activatedRoute.url,
        this.activatedRoute.queryParams,
      ]).subscribe(([urlSegments, queryParams]) => {
        const query = queryParams['q'];

        // Si hay query, restaurar búsqueda
        if (query) {
          this.inputValue.set(query);
          this.searchService.searchCountries(currentSearchKey, query);
          // Actualizar el input visual
          setTimeout(() => {
            if (this.inputElement()?.nativeElement) {
              this.inputElement()!.nativeElement.value = query;
            }
          }, 0);
        } else {
          this.searchService.clearCountries();
          this.inputValue.set('');
          setTimeout(() => {
            if (this.inputElement()?.nativeElement) {
              this.inputElement()!.nativeElement.value = '';
            }
          }, 0);
        }
      });
    }

    // Cleanup: desuscribirse cuando el effect se limpie
    onCleanUp(() => {
      if (this.routeSubscription) {
        this.routeSubscription.unsubscribe();
        this.routeSubscription = undefined;
      }
    });
  });

  constructor() {}

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  handleSearch(query: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { q: query || null },
      queryParamsHandling: 'merge', // Mantener otros query params existentes
    });
    this.searchService.navigationHistory.set(this.searchKey(), query);
  }

  searchNow() {
    this.inputElement()!.nativeElement.value = '';
    this.inputElement()?.nativeElement?.focus();
  }
}
