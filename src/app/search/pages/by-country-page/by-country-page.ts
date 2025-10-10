import { Component } from '@angular/core';
import { CountryList } from '../../../shared/components/country-list/country-list';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryList],
  templateUrl: './by-country-page.html',
})
export default class ByCountryPage {}
