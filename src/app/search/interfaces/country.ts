export interface Country {
  name: string;
  code: string;
  capital: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  region: string;
  subregion: string;
}
