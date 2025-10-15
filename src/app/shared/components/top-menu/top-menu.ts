import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { PATHS } from '../../../utils/paths';

@Component({
  selector: 'app-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.html',
})
export class TopMenu {
  private router = inject(Router);
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

  // Computed para verificar rutas específicas
  isHomePage = computed(() => this.currentUrl() === '/');
  isSearchPage = computed(() => this.currentUrl()?.startsWith('/search') ?? false);
  isDetailsPage = computed(() => this.currentUrl()?.includes('/by-code/') ?? false);
}
