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

  export interface ForecastApiItem {
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }