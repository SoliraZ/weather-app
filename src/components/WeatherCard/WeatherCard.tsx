'use client';

import Image from 'next/image';
import { WeatherData } from '@/types/weather';
import { Eye, Wind, Droplets, Gauge } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatDescription = (description: string) => {
    return description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {weather.name}, {weather.country}
          </h2>
          <p className="text-white/70 capitalize">
            {formatDescription(weather.description)}
          </p>
        </div>
        <div className="w-20 h-20 relative shrink-0">
          <Image
            src={getWeatherIcon(weather.icon)}
            alt={weather.description}
            fill
            sizes="80px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-6xl font-light text-white">
            {weather.temp}°
          </span>
          <span className="text-white/70 text-lg">C</span>
        </div>
        <p className="text-white/80">
          Feels like {weather.feelsLike}°C
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4">
        <WeatherDetail
          icon={<Droplets className="w-5 h-5" />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <WeatherDetail
          icon={<Wind className="w-5 h-5" />}
          label="Wind Speed"
          value={`${weather.windSpeed} m/s`}
        />
        <WeatherDetail
          icon={<Gauge className="w-5 h-5" />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />
        <WeatherDetail
          icon={<Eye className="w-5 h-5" />}
          label="Visibility"
          value={`${weather.visibility} km`}
        />
      </div>
    </div>
  );
}

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function WeatherDetail({ icon, label, value }: WeatherDetailProps) {
  return (
    <div className="bg-white/10 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-white/80">{icon}</div>
        <span className="text-white/80 text-sm">{label}</span>
      </div>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
} 