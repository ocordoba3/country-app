import { Component } from '@angular/core';
import { CountryList } from '../../../shared/components/country-list/country-list';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export default class ByRegionPage {}
