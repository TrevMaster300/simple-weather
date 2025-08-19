export type Units = 'metric' | 'imperial';

export type WeatherDTO = {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  icon: string; // absolute icon URL
};
