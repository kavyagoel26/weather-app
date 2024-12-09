import CurrentWeather from '@/components/current-weather';
import HourlyTemprature from '@/components/hourly-temprature';
import { WeatherSkeleton } from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import FavoriteButton from '@/components/favorite-button';
import WeatherDetails from '@/components/weather-details';
import WeatherForecast from '@/components/weather-forecast';
import { useForecastQuery, useWeatherQuery } from '@/hooks/useWeather';
import { AlertTriangle } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';

const CityPage = () => {

  const[searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon= parseFloat(searchParams.get("lon") || "0");

  const coordinates={lat, lon};
  
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>failed to load weather data.Please try again</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName} , {weatherQuery.data.sys.country}
          </h1>
          {/* <div> Favorite button</div> */}
       <div>
        <FavoriteButton data={{...weatherQuery.data, name: params.cityName}}/>
       </div>
        
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
        {/* //current weather */}
          <CurrentWeather
            data={weatherQuery.data}
          />
          {/* //hourly temprature */}
          <HourlyTemprature data={forecastQuery.data}/>
           
        </div>

        <div className="grid gap-6 md: grid-cols-2 items-start">
        {/* //detaile about weather */}
          <WeatherDetails data={weatherQuery.data}/>

          {/* //forcast detail */}
          <WeatherForecast data={forecastQuery.data}/>
          </div>
      </div>
    </div>
  )
}

export default CityPage