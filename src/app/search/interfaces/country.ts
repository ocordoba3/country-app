export interface Country {
  area: number;
  currencies: { [key: string]: { name: string; symbol: string } };
  name: string;
  code: string;
  capital: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    description: string;
  };
  coatOfArms: string;
  region: string;
  subregion: string;
  map: string;
}
