import { WeatherData, ForecastItem, Coordinates } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Ajout du cache et gestion d'erreurs
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  // ✅ Cache check
  const cached = weatherCache.get(city.toLowerCase());
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('🎯 Using cached data for:', city);
    return cached.data;
  }

  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(url);
    
    // ✅ Gestion des erreurs spécifiques
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error('INVALID_API_KEY');
        case 404:
          throw new Error('CITY_NOT_FOUND');
        case 429:
          throw new Error('RATE_LIMIT_EXCEEDED');
        case 500:
        case 502:
        case 503:
          throw new Error('SERVER_ERROR');
        default:
          throw new Error('UNKNOWN_ERROR');
      }
    }
    
    const data = await response.json();
    
    const weatherData: WeatherData = {
      name: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000,
    };
    
    // ✅ Sauvegarder dans le cache
    weatherCache.set(city.toLowerCase(), {
      data: weatherData,
      timestamp: Date.now()
    });
    
    return weatherData;
    
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('NETWORK_ERROR');
  }
};

export const getCurrentWeatherByCoords = async (
  coords: Coordinates
): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Unable to fetch weather data');
  }
  
  const data = await response.json();
  
  return {
    name: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000,
  };
};

export const getForecast = async (city: string): Promise<ForecastItem[]> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Unable to fetch forecast');
  }
  
  const data = await response.json();
  
  return data.list.slice(0, 5).map((item: any) => ({
    date: item.dt_txt,
    temp: Math.round(item.main.temp),
    description: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
};
