import { Country } from '../interfaces/country';
import { CountryResp } from '../interfaces/country-resp';

export function mapCountriesResponse(countries: CountryResp[]): Country[] {
  return countries.map((country) => ({
    name: country.translations['spa'].official || country.name.official,
    code: country.cca3 || country.cca2 || 'N/A',
    capital: country.capital ? country.capital.join(', ') : 'N/A',
    population: country.population,
    flags: {
      png: country.flags.png,
      svg: country.flags.svg,
    },
    region: country.region,
    subregion: country.subregion,
  }));
}
