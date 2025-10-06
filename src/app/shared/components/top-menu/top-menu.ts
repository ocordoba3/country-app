import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PATHS } from '../../../utils/paths';

@Component({
  selector: 'app-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.html',
})
export class TopMenu {
  paths = PATHS;
}
