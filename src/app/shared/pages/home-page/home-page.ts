import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATHS } from '../../../utils/paths';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
})
export default class HomePage {
  paths = PATHS;
}
