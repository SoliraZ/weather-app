export interface WeatherData {
    name: string;
    country: string;
    temp: number;
    feelsLike: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
  }
  
  export interface ForecastItem {
    date: string;
    temp: number;
    description: string;
    icon: string;
  }
  
  export interface Coordinates {
    lat: number;
    lon: number;
  }
  