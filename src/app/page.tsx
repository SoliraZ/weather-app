'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import ForecastCard from '@/components/ForecastCard/ForecastCard';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { WeatherData, ForecastItem } from '@/types/weather';
import { 
  getCurrentWeather, 
  getCurrentWeatherByCoords, 
  getForecast 
} from '@/lib/weather';
import { getCurrentLocation } from '@/lib/geolocation';
import { CloudSun } from 'lucide-react';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger données par défaut (Paris) au démarrage
  useEffect(() => {
    handleSearch('Paris');
  }, []);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationClick = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const coords = await getCurrentLocation();
      const weatherData = await getCurrentWeatherByCoords(coords);
      const forecastData = await getForecast(weatherData.name);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to get your location');
    } finally {
      setIsLoading(false);
    }
  };

  const getBackgroundGradient = (weather: WeatherData | null) => {
    if (!weather) return 'from-blue-400 to-blue-600';
    
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (weather.description.includes('rain')) {
      return isNight ? 'from-gray-700 to-gray-900' : 'from-gray-500 to-gray-700';
    }
    
    if (weather.description.includes('cloud')) {
      return isNight ? 'from-indigo-800 to-purple-900' : 'from-gray-400 to-blue-500';
    }
    
    if (weather.description.includes('clear') || weather.description.includes('sun')) {
      return isNight ? 'from-indigo-900 to-purple-900' : 'from-yellow-400 to-orange-500';
    }
    
    return isNight ? 'from-indigo-800 to-purple-900' : 'from-blue-400 to-blue-600';
  };

  return (
    <main className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weather)} transition-colors duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold text-white">Weather App</h1>
          </div>
          <p className="text-white/80 text-lg">
            Get current weather conditions and forecasts for any city
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            onLocationClick={handleLocationClick}
            isLoading={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-lg p-4">
              <p className="text-white text-center">{error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Weather Content */}
        {!isLoading && weather && (
          <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
            {/* Main Weather Card */}
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} />
            </div>
            
            {/* Forecast */}
            {forecast.length > 0 && (
              <div className="lg:col-span-1">
                <ForecastCard forecast={forecast} />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-white/60">
          <p>Built with Next.js & OpenWeatherMap API</p>
        </footer>
      </div>
    </main>
  );
}
