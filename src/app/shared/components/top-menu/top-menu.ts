import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { PATHS } from '../../../utils/paths';
import { SearchService } from '../../../search/services/search-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.html',
})
export class TopMenu {
  private router = inject(Router);
  location = inject(Location);
  searchService = inject(SearchService);
  paths = PATHS;

  // Convertir NavigationEnd a signal
  currentUrl = toSignal(
    this.router.events.pipe(
      // Solo eventos de NavigationEnd
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  isSearchPage = computed(() => this.currentUrl()?.startsWith('/search') ?? false);
  isDetailsPage = computed(() => this.currentUrl()?.includes('/by-code/') ?? false);

  goBack() {
    return this.searchService.navigationHistory.size > 0
      ? this.location.back()
      : this.router.navigate(['/', this.paths.search, this.paths.region]);
  }
}
