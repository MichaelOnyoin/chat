//import axios from 'axios'
'use client'
import axios, { AxiosResponse } from 'axios';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SearchResult { 
    title: string; 
    link: string; 
    snippet: string; 
}

export function SearchBrave(query: any){
     const url = 'https://www.google.com/';
     const API_KEY='BSAXH1w-j_FK7P6zu8rJ9jFtfEUbZrG';
     const [query1, setQuery] = useState<string>('');
     const[int, setInt]= useState<any>('');
     
    const Search = async ()=>{
     try { 
        // Make the request to the Brave Search API 
        const response: AxiosResponse<any> = await axios.get(url, 
            { 
                params: { q: query1, count:5, offset:0 },// The search query count: 10, // Number of results to retrieve offset: 0, // Offset for pagination 
            
                headers: { Authorization: API_KEY}
            }
             // Add the API key for authorization 
            
            
        );
        // Extract and format the search results
             
            const results = response.data.webpages.value || [];
            const Internet= results.map((result: any) => ({
            title: result.name,
            link: result.url,
            snippet: result.snippet,
            }));

            setInt(Internet);
            console.log('Search Results:', results);
      }
        catch (error) 
        { console.error('Error fetching search results:', error); return []; } 

    // searchBrave('latest AI trends') .then((results) => { console.log('Search Results:', results); }) .catch((error) => { console.error('Search Error:', error); });
       };
 return(
    <div>
        <h1>Search Results</h1>
        
        <input 
          className='min-h-[60px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg'
          type="text" id="search" 
          value={query1}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search..."/>
        
        <Button
        onClick={Search}
            //.then((results) => { console.log('Search Results:', results); }).catch((error) => { console.error('Search Error:', error); 

            // }) }
        >Search</Button>
        
        <script async src="https://cse.google.com/cse.js?cx=809bf1261a7df4589">
            
            <div className="gcse-search">input</div>
        </script>
        <div>
            <h2>Search Results</h2>
            <p>
               {int && (
                int.map((item: any) => (
                    <div key={item.title}>
                        <h2>{item.title}</h2>
                         <p>{item.link}</p>
                         <p>{item.snippet}</p>
                    </div>

               )))}
            </p>

        </div>
        <p>{int}
           {}
        </p>
        
    </div>
 )
 }

 