import { Component, input } from '@angular/core';
import { SortBy, SortOrder } from '../../../pipes/sort-pipe';

@Component({
  selector: 'app-sort-buttons',
  imports: [],
  templateUrl: './sort-buttons.html',
  styleUrl: './sort-buttons.css',
})
export class SortButtons {
  sortKey = input<SortBy>();
  sortOrder = input<SortOrder>();
}
