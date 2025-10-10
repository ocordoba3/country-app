import { Component, signal } from '@angular/core';
import { CountryList } from '../../../shared/components/country-list/country-list';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList],
  templateUrl: './by-capital-page.html',
})
export default class ByCapitalPage {}
