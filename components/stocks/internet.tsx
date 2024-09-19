'use client'
import axios from 'axios';
import { useState } from 'react';
import { Button } from '../ui/button';


export function Internet(){
    const [query, setQuery] = useState('');
    const [data, setData] = useState<any>();
     
    const Int = async()=>{
    try {
      const result =await axios.get('https://api.search.brave.com/res/v1/web/search', {
        headers: {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': 'BSAXH1w-j_FK7P6zu8rJ9jFtfEUbZrG'
        },
        params: {
            //q: input,
            q:'Cristiano Ronaldo',
            count: 5  ,
            extra_snippets: true
            }
      })
      .then(response => {
        console.log(response.data.web.results);
        const search =response.data.web.results;
        
        setData(search);
      })
      .catch(error => {
        console.log(error);
      });
      
    } catch (error) {
      console.log('error')
    }



    //const result = await POST(query).then(response => response.json().catch(error => console.error(error)));
    //setData(result);
  }
  return (
    <div>
        <h1>Search Results</h1>
        
        <input 
          className='min-h-[100px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg'
          type="text" id="search" 
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search..."/>
        
        <Button
         onClick={Int}>Search</Button>
        <div>
            <h2>Search Results</h2> 
           
                {data && (
                  <div className="flex flex-col gap-4">
                    <p>{data.title}</p>
                    <p>{data.url}</p>
                    <p>{data.extra_snippet}</p>
                  </div>
                )}
                

           

        </div>
        
        
    </div>
  )
 

}