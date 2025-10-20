import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { PATHS } from '../../../utils/paths';
import { SearchService } from '../../../search/services/search-service';
import { Location } from '@angular/common';
import { SearchKey } from '../../../search/interfaces/country-resp';

@Component({
  selector: 'app-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.html',
})
export class TopMenu {
  private router = inject(Router);
  location = inject(Location);
  searchService = inject(SearchService);

  routes = [
    {
      path: PATHS.region,
      label: 'Region',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyYzQuNzE0IDAgNy4wNzEgMCA4LjUzNSAxLjQ2NGMuNTA0LjUwNC44MzUgMS4xMTQgMS4wNTIgMS44ODlMNS4zNTMgMjEuNTg3Yy0uNzc1LS4yMTctMS4zODUtLjU0OC0xLjg4OS0xLjA1MkMyIDE5LjA3MiAyIDE2LjcxNCAyIDEyczAtNy4wNzEgMS40NjQtOC41MzZDNC45MyAyIDcuMjg2IDIgMTIgMk01LjUgOC43NTdjMCAxLjc4NSAxLjExNyAzLjg2OCAyLjg2IDQuNjEzYy40MDYuMTczLjg3NC4xNzMgMS4yOCAwYzEuNzQzLS43NDUgMi44Ni0yLjgyOCAyLjg2LTQuNjEzQzEyLjUgNi45NTggMTAuOTMzIDUuNSA5IDUuNVM1LjUgNi45NTggNS41IDguNzU3IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTAuNSA5YTEuNSAxLjUgMCAxIDEtMyAwYTEuNSAxLjUgMCAwIDEgMyAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTIxLjg5IDcuMTcyQzIyIDguNDMzIDIyIDEwLjAwNiAyMiAxMmMwIDQuMTM0IDAgNi40NTUtLjk4NyA3Ljk1MUwxNS4wNiAxNHptLTEuOTM4IDEzLjg0bC01Ljk1MS01Ljk1MWwtNi44MyA2LjgyOGMxLjI2Mi4xMTEgMi44MzUuMTExIDQuODMuMTExYzQuMTM0IDAgNi40NTUgMCA3Ljk1MS0uOTg4IiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=',
      key: 'region' as SearchKey,
    },
    {
      path: PATHS.country,
      label: 'Name',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgMS43NWEuNzUuNzUgMCAwIDAtMS41IDB2MjBhLjc1Ljc1IDAgMCAwIDEuNSAweiIgY2xpcC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMTMuNTU4IDMuODczbC0uNDEzLS4xNjVhOC43IDguNyAwIDAgMC00LjkyNC0uNDUyTDYuNSAzLjZ2MTBsMS43Mi0uMzQ0YTguNyA4LjcgMCAwIDEgNC45MjUuNDUyYTguNjggOC42OCAwIDAgMCA1LjMyNy4zNjFsLjEtLjAyNWEuOS45IDAgMCAwIC41NTMtMS4zMzVsLTEuNTYtMi42MDFjLS4zNDItLjU3LS41MTMtLjg1NC0uNTUzLTEuMTYzYTEuNSAxLjUgMCAwIDEgMC0uMzljLjA0LS4zMDkuMjExLS41OTQuNTUzLTEuMTYzbDEuMjc4LTIuMTNhLjczLjczIDAgMCAwLS44MDMtMS4wODRhNy4zIDcuMyAwIDAgMS00LjQ4Mi0uMzA1Ii8+PC9zdmc+',
      key: 'country' as SearchKey,
    },
    {
      path: PATHS.capital,
      label: 'Capital',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOS43MDcgNC43OTNDOS40MTQgNC41IDguOTQzIDQuNSA4IDQuNWgtLjI1VjNhLjc1Ljc1IDAgMCAwLTEuNSAwdjEuNUg2Yy0uOTQzIDAtMS40MTQgMC0xLjcwNy4yOTNTNCA1LjU1NyA0IDYuNXYuMjA0cS4zMDUtLjA3OC42MDYtLjExN0M1LjI1IDYuNSA2LjA0NSA2LjUgNi45MSA2LjVoLjE3OWMuODY1IDAgMS42NTkgMCAyLjMwNC4wODdxLjMwMi4wMzguNjA2LjExN1Y2LjVjMC0uOTQzIDAtMS40MTQtLjI5My0xLjcwNyIvPjxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIgMjEuMjVhLjc1Ljc1IDAgMCAwIDAgMS41aDIwYS43NS43NSAwIDAgMCAwLTEuNWgtMVY3Ljc3MmMwLTEuMzQgMC0yLjAxMS0uMzU2LTIuNTI1cy0uOTg0LS43NS0yLjI0LTEuMjJjLTIuNDU1LS45MjEtMy42ODItMS4zODEtNC41NDMtLjc4NUMxMyAzLjg0IDEzIDUuMTUgMTMgNy43NzJWMTAuNWguMDljLjg2NSAwIDEuNjU5IDAgMi4zMDQuMDg3Yy43MTEuMDk1IDEuNDYzLjMyIDIuMDguOTM4Yy42MTkuNjE4Ljg0NCAxLjM3Ljk0IDIuMDhjLjA4Ni42NDYuMDg2IDEuNDQuMDg2IDIuMzA2djUuMzM5SDE3VjE2YzAtMS44ODYgMC0yLjgyOC0uNTg2LTMuNDE0UzE0Ljg4NiAxMiAxMyAxMmgtMmMtMS44ODYgMC0yLjgyOCAwLTMuNDE0LjU4NlM3IDE0LjExNCA3IDE2djUuMjVINS41di01LjM0YzAtLjg2NSAwLTEuNjU5LjA4Ny0yLjMwNGMuMDk1LS43MTEuMzItMS40NjMuOTM4LTIuMDhjLjYxOC0uNjE5IDEuMzctLjg0NCAyLjA4LS45NGMuNjQ2LS4wODYgMS40NC0uMDg2IDIuMzA2LS4wODZoLjA3MmMtLjA0LS45MzYtLjE2NS0xLjUxLS41NjktMS45MTRDOS44MjggOCA4Ljg4NiA4IDcgOHMtMi44MjggMC0zLjQxNC41ODZTMyAxMC4xMTQgMyAxMnY5LjI1ek05LjI1IDE1YS43NS43NSAwIDAgMSAuNzUtLjc1aDRhLjc1Ljc1IDAgMCAxIDAgMS41aC00YS43NS43NSAwIDAgMS0uNzUtLjc1bTAgM2EuNzUuNzUgMCAwIDEgLjc1LS43NWg0YS43NS43NSAwIDAgMSAwIDEuNWgtNGEuNzUuNzUgMCAwIDEtLjc1LS43NSIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+',
      key: 'capital' as SearchKey,
    },
  ];

  currentUrl = toSignal(
    this.router.events.pipe(
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
      : this.router.navigate(['/', PATHS.search, PATHS.region]);
  }
}
