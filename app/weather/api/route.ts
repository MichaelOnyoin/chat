// pages/api/weather.ts
'use server'

//import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import axios from 'axios';
//import { OpenWeatherMap } from '../types/openweathermap';
const API_KEY = process.env.OPENWEATHER_API_KEY; // Store your API key in environment variables

//export default async function POST(req: Request, res: NextApiResponse) {
export default async function POST(req: Request) {
  const { city } = await req.json(); // Get the city from the query string
  console.log('Step 1:' +city)
  if (!city) {
    //return res.status(400).json({ error: 'City is required' });
    //return res.status.toString()
    return NextResponse.json({message: 'No city given'})
  }

  try {
    //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kampala&units=metric&appid=${API_KEY}`);
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);

    if (!response.data.success) {
      throw new Error('Failed to fetch weather data');
      
    }else{
      const result = await response.data
      return NextResponse.json(result)
      // return NextResponse.json(response.data, {})
      
      // NextResponse.json({result})
    }


    //const data = await response.json();
    //NextResponse.json({data})
    //res.status(200).json(data); // Return the weather data as JSON
    //res.json.toString()
   // res.body
  } catch (error) {
    //res.status(500).json({ error: (error as Error).message });
    //res.status; 500
    return NextResponse.json({message:
      'Error'
    })
  }
}
