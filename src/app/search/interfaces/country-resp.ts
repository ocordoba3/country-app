export type SearchKey = 'name' | 'capital' | 'region' | 'alpha';

export interface CountryResp {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: {
      symbol: string;
      name: string;
    };
  };
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonyms;
  cca3: string;
  translations: { [key: string]: Translation };
  flag: string;
  maps: Maps;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}

interface CapitalInfo {
  latlng: number[];
}

interface Car {
  signs: string[];
  side: string;
}

interface CoatOfArms {
  png: string;
  svg: string;
}
interface Demonyms {
  eng: Eng;
  fra: Eng;
}

interface Eng {
  f: string;
  m: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Gini {
  '2018': number;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Languages {
  est: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  est: Translation;
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex: string;
}
