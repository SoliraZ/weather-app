'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import ForecastCard from '@/components/ForecastCard/ForecastCard';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { WeatherSkeleton, ForecastSkeleton } from '@/components/Skeletons/SkeletonCards';
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // ✅ Messages personnalisés
      switch (errorMessage) {
        case 'CITY_NOT_FOUND':
          setError('🏙️ City not found. Please check the spelling.');
          break;
        case 'RATE_LIMIT_EXCEEDED':
          setError('⏰ Too many requests! Please wait a few minutes and try again.');
          break;
        case 'INVALID_API_KEY':
          setError('🔑 API configuration error. Please contact support.');
          break;
        case 'SERVER_ERROR':
          setError('🌩️ Weather service temporarily unavailable. Try again later.');
          break;
        case 'NETWORK_ERROR':
          setError('🌐 Network error. Check your internet connection.');
          break;
        default:
          setError('❌ Something went wrong. Please try again.');
      }
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

  // ✅ Fonction pour le style d'erreur
  const getErrorStyle = (error: string) => {
    if (error.includes('Too many requests')) {
      return "bg-gradient-to-r from-orange-50 to-red-50 border border-orange-300 text-orange-800";
    }
    if (error.includes('City not found')) {
      return "bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800";
    }
    if (error.includes('temporarily unavailable')) {
      return "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 text-yellow-800";
    }
    return "bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-300 text-gray-800";
  };

  const shouldReserveContentArea = isLoading || !!weather || !!error;
  const shouldShowForecastColumn = forecast.length > 0 || isLoading || !weather;

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
            <div className={`${getErrorStyle(error)} px-6 py-4 rounded-xl shadow-lg`}>
              <div className="flex items-center justify-center">
                <p className="font-medium text-center" role="status">{error}</p>
              </div>
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
        {shouldReserveContentArea && (
          <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {weather ? (
                <WeatherCard weather={weather} />
              ) : isLoading ? (
                <WeatherSkeleton />
              ) : (
                <div aria-hidden="true">
                  <WeatherSkeleton />
                </div>
              )}
            </div>
            
            {shouldShowForecastColumn && (
              <div className="lg:col-span-1">
                {forecast.length > 0 ? (
                  <ForecastCard forecast={forecast} />
                ) : (
                  <div aria-hidden={forecast.length === 0 && !isLoading}>
                    <ForecastSkeleton />
                  </div>
                )}
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
