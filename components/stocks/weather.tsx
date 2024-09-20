'use client'
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { SunIcon,BlendingModeIcon } from "@radix-ui/react-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind,faThermometerHalf } from "@fortawesome/free-solid-svg-icons";


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
       {weather&&(

       
<div className="bg-white rounded-lg shadow-lg p-6 w-209 content-center">
    <div className="text-center text-xl font-bold text-gray-800 mb-4">{weather.name} Weather Forecast</div>
    <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-700">Date: {new Date().toLocaleString() + ''}</div>
        <input type="text"  
        value={city1}
        placeholder="city name"
        className="border border-orange-400 rounded-full px-3 py-1 text-gray-700 focus:outline-none" />
        
    </div>
    <div className="flex">
        <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" className="mb-2" />
            <div className="text-4xl font-bold text-gray-800">{weather.main.temp}°C</div>
            <div className="text-gray-600">{weather.weather[0].description}</div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4 p-4">
            <div className="flex flex-col items-center">
                <div className="text-gray-600">Feels Like</div>
                <div className="text-xl font-bold text-gray-800">{weather.main.feels_like}°C</div>
                <FontAwesomeIcon icon={faThermometerHalf} className="fas fa-thermometer-half " style={{ color: "orange" }}></FontAwesomeIcon>
                
            </div>
            <div className="flex flex-col items-center">
                <div className="text-gray-600">Wind</div>
                <div className="text-xl font-bold text-gray-800">{weather.wind.speed} m/s</div>
                
                <FontAwesomeIcon icon={faWind} className="fas fa-wind" style={{ color: "grey" }}>

                </FontAwesomeIcon>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-gray-600">Humidity</div>
                <div className="text-xl font-bold text-gray-800">{weather.main.humidity}%</div>
               
                <BlendingModeIcon className="text-blue-500"></BlendingModeIcon>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-gray-600">Pressure</div>
                <div className="text-xl font-bold text-gray-800">{weather.main.pressure} mm</div>
                
            </div>
            <div className="flex flex-col items-center">
                <div className="text-gray-600">Country</div>
                <div className="text-xl font-bold text-gray-800">{weather.sys.country}</div>
                
            </div>
            <div className="flex flex-col items-center">
                <div className="text-gray-600">Sunset</div>
                <div className="text-xl font-bold text-gray-800">
                  {new Date((weather.sys.sunset+weather.timezone)*1000).toISOString().substring(11,16)}pm
                  {/* 
                  {new Date((weather.sys.sunrise+weather.timezone)*1000).toISOString().substring(11,16)}
                  {new Date()} */}
                  </div>
                
                <SunIcon className="text-orange-500"></SunIcon>
            </div>
        </div>
    </div>
</div>
)}
    </div>


  )
  
}

