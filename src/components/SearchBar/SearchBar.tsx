'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  isLoading: boolean;
}

export default function SearchBar({ 
  onSearch, 
  onLocationClick, 
  isLoading 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex gap-2 mb-8">
      <form onSubmit={handleSubmit} className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={isLoading}
        />
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
      </form>
      
      <button
        type="button"
        onClick={onLocationClick}
        disabled={isLoading}
        className="px-4 py-3 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white hover:bg-white/30 transition-colors disabled:opacity-50"
        aria-label="Use current location"
      >
        <MapPin className="w-5 h-5" />
      </button>
    </div>
  );
} 