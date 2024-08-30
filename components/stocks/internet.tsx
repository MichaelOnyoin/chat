'use client'
import axios from 'axios';
import cheerio from 'cheerio';
import { useActions, useUIState } from 'ai/rsc'
import { useState } from 'react';
import type { AI } from '@/lib/chat/actions'
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function SearchInternet(query: any){
    const [, setMessages] = useUIState<typeof AI>()
    const { submitUserMessage } = useActions()
    const[search,setSearch]= useState<any>(null);
    const [query1, setQuery] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const url = `https://www.google.com/search?q=${query1}`;
    const Search = async () =>{
    try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            // Extract the information you need from the website
            // For example, find and print the first search 
            //
            const searchResults = $(`h3.search-result-title`);
           // setSearch(searchResults.text());
            //const searchResults = $;

            if (searchResults.length > 0) {
                const firstResult = searchResults.first().text();
                console.log(firstResult);
                // Add the result to the messages
                // const response = await submitUserMessage(`View ${query}`)
                // setMessages((prevMessages) => [...prevMessages, { type: 'text', text:
                //     firstResult }]);
                setSearch(firstResult)    
                    
            } else {
                console.log("No search results found.");
            }
        } else {
            console.log("Failed to retrieve search results.");
        }
     
    } catch (error) {
        console.error("An error occurred:", error);
    }
    //Search()
   }

   return(
    <div>
      <p>
        <input
        className='min-h-[60px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg'
        type='text'
        value={query1}
        onChange={ (e) => setQuery(e.target.value)}
        placeholder='Input Query'
        />
        {}
        <Button onClick={Search}>Search</Button>

      </p>
      <div>
      <p>
        <h3>Here are the results:  <Card>{search}</Card></h3>
        {search}
        <br>
         
        </br>
      </p>
      </div>
    </div>
   )
}


// Example usage

