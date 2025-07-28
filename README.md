# 🌤️ Weather App

A modern and performant weather application built with Next.js, TypeScript, and Tailwind CSS. Get current weather conditions and forecasts for any city around the world.

![Weather App](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🌍 **City Search**
- Search by city name
- Multi-language support
- Automatic suggestions
- Input error handling

### 📍 **Geolocation**
- Automatic position detection
- Quick location button
- Geolocation permission handling

### 🌡️ **Complete Weather Data**
- **Current temperature** and feels like
- **Weather conditions** with descriptions
- **Humidity** and atmospheric pressure
- **Wind speed** and visibility
- **Dynamic weather icons**

### 📅 **5-Day Forecast**
- Detailed hourly forecasts
- Temperatures and conditions
- Intuitive card interface

### 🎨 **Modern User Interface**
- **Responsive design** (mobile, tablet, desktop)
- **Dynamic themes** based on weather
- **Smooth animations** and transitions
- **Automatic day/night mode**
- **Adaptive background gradients**

### ⚡ **Optimized Performance**
- **Smart caching system** (10 minutes)
- **Rate limiting** to prevent API overload
- **Automatic retry** on network errors
- **Optimized loading** with spinners

### 🛡️ **Robust Error Handling**
- Personalized and informative error messages
- API limit management
- Network and server errors
- Clear user interface in case of issues

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd weather-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment configuration**
```bash
# Create .env.local file at project root
touch .env.local

# Add your OpenWeatherMap API key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Create a free account
3. Generate an API key
4. Add the key to your `.env.local` file

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Main layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── SearchBar/          # Search bar
│   │   ├── WeatherCard/        # Main weather card
│   │   ├── ForecastCard/       # Forecast card
│   │   └── LoadingSpinner/     # Loading spinner
│   ├── lib/                    # Services and utilities
│   │   ├── weather.ts          # Weather API and cache
│   │   └── geolocation.ts      # Geolocation service
│   ├── types/                  # TypeScript types
│   │   └── weather.ts          # Weather interfaces
│   └── utils/                  # Utilities
│       └── rate-limiter.ts     # API rate limiter
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## 🛠️ Technologies Used

### Frontend
- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Static typing
- **Tailwind CSS 4.1.11** - Utility CSS framework

### Utilities
- **date-fns 4.1.0** - Date manipulation
- **lucide-react 0.532.0** - Modern icons

### APIs
- **OpenWeatherMap API** - Weather data
- **Geolocation API** - Position detection

## 🔄 Technical Features

### Caching System
- In-memory cache with Map
- Configurable cache duration (10 minutes)
- Automatic cleanup of expired data

### Rate Limiting
- Limited to 50 calls per minute
- Protection against API overload
- Smart limit management

### Automatic Retry
- Maximum 3 attempts per request
- Progressive delay between attempts
- Server error handling (500+)

### Error Handling
- Personalized error messages
- Visual styles adapted to error type
- Informative logs for debugging

## 📱 Responsive Design

The application adapts perfectly to all screens:

- **Mobile** (< 768px): Optimized vertical layout
- **Tablet** (768px - 1024px): Adaptive grid
- **Desktop** (> 1024px): 3-column layout

## 🎨 Dynamic Themes

The app background changes automatically based on:

- **Weather conditions** (rain, cloudy, sunny)
- **Time of day** (day/night)
- **Smooth transitions** between themes

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build the application
npm run start        # Start production server

# Code quality
npm run lint         # Check code with ESLint
```

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

---
