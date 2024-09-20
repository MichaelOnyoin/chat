'use client'
import React from "react";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { SunIcon,BlendingModeIcon } from "@radix-ui/react-icons";


import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWind,faThermometerHalf } from "@fortawesome/free-solid-svg-icons";



export default function Weather(){
    const [city1, setCity] = useState<string>('');
    const [weather, setWeather] = useState<any>(null);
    const fetchWeather = async () => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city1}&units=metric&appid=5903236a4f6da416d119d851a5de7b02`
          );
      
      const data = await response.data;
      console.log(response);
      if (data.error) {
        throw new Error(data.error);
      }
      setWeather(response.data);
      
    }catch(err){
        console.log('error')
    }
}
    
    return(
    <div id="root" >
        <input
        className='min-h-[60px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg' 
         type="text"
         value={city1}
         onChange={(e) => setCity(e.target.value)} 
         placeholder="Enter city name"
        />
       <Button  onClick={fetchWeather}>Get Weather</Button>

       {weather&&(

       
                <div className="bg-white rounded-lg shadow-lg p-6 w-209 content-center">
                    <div className="text-center text-xl font-bold text-gray-800 mb-4">{weather.name} Weather Forecast</div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-bold text-gray-700">{new Date().toLocaleString() + ''}</div>
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
                                <div className="text-xl font-bold text-gray-800">6:26 PM</div>
                                
                                <SunIcon className="text-orange-500"></SunIcon>
                            </div>
                        </div>
                    </div>
                </div>
       )}
      
    </div>

    )

}

// Typescript

/* <html>
<head>
    <title>Kandy Weather Forecast</title>
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        // @ts-ignore
        const { useState } = React;

        const WeatherCard: React.FC = () => {
            const [location, setLocation] = useState<string>("kandy");

            return (
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <div className="text-center text-xl font-bold text-gray-800 mb-4">Kandy Weather Forecast</div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-bold text-gray-700">Thursday, 29 June</div>
                        <input 
                            type="text" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            className="border border-orange-400 rounded-full px-3 py-1 text-gray-700 focus:outline-none" 
                        />
                    </div>
                    <div className="flex">
                        <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200">
                            <img src="https://placehold.co/100x100?text=Weather+Icon" alt="Weather icon showing light rain" className="mb-2" />
                            <div className="text-4xl font-bold text-gray-800">25°C</div>
                            <div className="text-gray-600">light rain</div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 p-4">
                            <div className="flex flex-col items-center">
                                <div className="text-gray-600">Feels Like</div>
                                <div className="text-xl font-bold text-gray-800">23°C</div>
                                <i className="fas fa-thermometer-half text-orange-500"></i>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-gray-600">Wind</div>
                                <div className="text-xl font-bold text-gray-800">1.87 m/s</div>
                                <i className="fas fa-wind text-blue-500"></i>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-gray-600">Humidity</div>
                                <div className="text-xl font-bold text-gray-800">89%</div>
                                <i className="fas fa-tint text-blue-500"></i>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-gray-600">Rain</div>
                                <div className="text-xl font-bold text-gray-800">N/A mm</div>
                                <i className="fas fa-cloud-rain text-blue-500"></i>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-gray-600">Sunrise</div>
                                <div className="text-xl font-bold text-gray-800">5:54 AM</div>
                                <i className="fas fa-sun text-orange-500"></i>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-gray-600">Sunset</div>
                                <div className="text-xl font-bold text-gray-800">6:26 PM</div>
                                <i className="fas fa-sun text-orange-500"></i>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        ReactDOM.render(<WeatherCard />, document.getElementById('root'));
    </script>
</body>
</html> */


