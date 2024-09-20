'use client'
import axios from 'axios';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Search from './api'

export default function Internet(){
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = React.useState<any>();

  const handleSearch = async () => {
    const results = await Search(query);
    setSearchResults(results);
  };
 

  return(
    <div>
    <input
        className='min-h-[60px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg' 
         type="text"
         value={query}
         onChange={(e) => setQuery(e.target.value)} 
         placeholder="Enter Search Query"
       />
       <Button onClick={handleSearch}>Search</Button>

       {/* {searchResults.map((result: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
        <p key={index}>{result.title}</p>
      ))} */}
      {/* <h1>{searchResults}</h1>
        <p>{searchResults.description}</p>
        <p><a href={searchResults.url}>{searchResults.url}</a></p>
        <p>{searchResults.extra_snippets}</p> */}
    
    </div>   
    
  )
 
}
