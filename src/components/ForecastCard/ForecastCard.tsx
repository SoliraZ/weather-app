'use client';

import type { ForecastItem } from '@/types/weather';
import { format } from 'date-fns';

interface ForecastCardProps {
  forecast: ForecastItem[];
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
      
      <div className="space-y-3">
        {forecast.map((item, index) => (
          <ForecastItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

interface ForecastItemProps {
  item: ForecastItem;
}

function ForecastItem({ item }: ForecastItemProps) {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'HH:mm');
  };

  return (
    <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors">
      <div className="flex-1">
        <p className="text-white font-medium">{formatDate(item.date)}</p>
        <p className="text-white/70 text-sm">{formatTime(item.date)}</p>
      </div>
      
      <div className="flex items-center gap-3 flex-1 justify-center">
        <img
          src={getWeatherIcon(item.icon)}
          alt={item.description}
          className="w-10 h-10"
        />
        <p className="text-white/80 text-sm capitalize">{item.description}</p>
      </div>
      
      <div className="text-right flex-1">
        <p className="text-white text-xl font-bold">{item.temp}°</p>
        <p className="text-white/70 text-sm">C</p>
      </div>
    </div>
  );
} 