import { Country } from '../interfaces/country';
import { CountryResp } from '../interfaces/country-resp';

export function mapCountriesResponse(countries: CountryResp[]): Country[] {
  return countries.map((country) => ({
    area: country.area,
    currencies: country.currencies,
    name: country.name.official,
    code: country.cca3 || country.cca2 || 'N/A',
    capital: country.capital ? country.capital.join(', ') : 'N/A',
    population: country.population,
    flags: {
      png: country.flags.png,
      svg: country.flags.svg,
      description: country.flags.alt || '',
    },
    coatOfArms: country.coatOfArms.png || country.coatOfArms.svg || '',
    region: country.region,
    subregion: country.subregion,
    map:
      country.maps.googleMaps ||
      'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(country.name.common),
  }));
}
