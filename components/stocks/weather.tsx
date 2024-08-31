'use client'
import { useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Image from 'next/image'

export function Weather(){
  
  const [city1, setCity] = useState<string>('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city1}&units=metric&appid=5903236a4f6da416d119d851a5de7b02`
          );
      
      const data = await response.data;
      console.log(response.data);
      if (data.error) {
        throw new Error(data.error);
      }

      setWeather(response.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return(
    <div>
       <input
        className='min-h-[60px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg' 
         type="text"
         value={city1}
         onChange={(e) => setCity(e.target.value)} 
         placeholder="Enter city name"
       />
       <Button  onClick={fetchWeather}>Get Weather</Button>
       
        
       {loading && <p>Loading...</p>}
       {error && <p>Error: {error}</p>}
       {weather && ( 
        
    <Card className="w-[580px] justify-content">
      <div>
      <CardHeader>
        <CardTitle>
        <h2 className="text-lg font-bold" >Weather in {weather.name}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">   
                Date: {new Date().toLocaleString() + ''}
        </p>


      </CardContent>
      <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className='flex-1 space-y-1 grid-cols-3'>
              {/* <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              width={50}
              height={50}
              // className="w-21 h-21"

              /> */}
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" className="w-21 h-21" />
                <p className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 font-semibold" >Temperature: {weather.main.temp} °C</p>
                <p className="text-xl font-semibold">Condition: {weather.weather[0].description}</p>
                <p className="text-gray-500">Feels like : {weather.main.feels_like}°C</p>
            </div>
            <div>
                <p className="text-gray-500 font-medium">Humidity : {weather.main.humidity}%</p>
                <p className="text-gray-500 font-medium">Pressure : {weather.main.pressure}</p>
                <p className="text-gray-500 font-medium">Wind Speed : {weather.wind.speed}m/s</p>
            </div>
          </div>
          </CardContent>
      </div>
    </Card>
    )}
    </div>


  )
  
}

