import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../search/interfaces/country';

export type SortBy = 'name' | 'population' | undefined;
export type SortOrder = 'asc' | 'desc' | undefined;

@Pipe({
  name: 'sortPipe',
})
export class SortPipe implements PipeTransform {
  transform(
    value: Country[],
    sortBy: SortBy,
    orderBy?: SortOrder
    // filterBy?: any
  ): Country[] {
    if (!sortBy || !orderBy) return value;
    // avoid mutating the original array
    return [...value].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        // fallback to string comparison for mixed/unknown types
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return orderBy === 'asc' ? comparison : -comparison;
    });
  }
}
