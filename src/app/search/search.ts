import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../shared/components/footer/footer';
import { TopMenu } from '../shared/components/top-menu/top-menu';

@Component({
  selector: 'app-search',
  imports: [RouterOutlet, Footer, TopMenu],
  templateUrl: './search.html',
})
export default class SearchLayout {}
