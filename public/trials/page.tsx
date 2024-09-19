import axios from 'axios';
import * as React from 'react';
import { Button } from '@/components/ui/button';

export default function Internet(){
 

axios.get('https://api.search.brave.com/res/v1/web/search', {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': 'BSAXH1w-j_FK7P6zu8rJ9jFtfEUbZrG'
    },
    params: {
        q: 'Hulk',
        count: 5  ,
        extra_snippets: true
        }
  })
  .then(response => {
    //console.log(response.data.web.results);
    const search =response.data.web.results[0].extra_snippets;
    const describe=response.data.web.results[0].description;
    const title=response.data.web.results[0].title;
    const url =response.data.web.results[0].url;
    // console.log('Search Title',title);
    // console.log('Url', url);

    // console.log('Search Result Json',search,  
    //   'description',describe);
    
    

    const result = response.data.web.results[0];
    return (
      <div>
        <h1>{result.title}</h1>
        <p>{result.description}</p>
        <p><a href={result.url}>{result.url}</a></p>
        <p>{result.extra_snippets}</p>
      </div>
    );

    
  })
  .catch(error => {
    //console.log(error);
  });

  return(
    <div>
    <input
        className='min-h-[60px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg' 
         type="text"
         //value={city1}
         //onChange={(e) => setCity(e.target.value)} 
         placeholder="Enter city name"
       />
       <Button onClick={Internet}>Search</Button>
    </div>   
  )
 
}




// 'use client'
// import React from 'react';
// import { fetchSearchResults } from './api';

// export default function Internet() {
//   const [searchResults, setSearchResults] = React.useState([]);

//   const handleSearch = async () => {
//     const results = await fetchSearchResults('Messi', 5);
//     setSearchResults(results);
//   };

//   return (
//     <div>
//       <p>Hello</p>
//       <button onClick={handleSearch}>Search</button>
//       {searchResults.map((result, index) => (
//         <p key={index}>{result.title}</p>
//       ))}

      
//     </div>
    
//   );
// }


// 'use client'
// import axios from 'axios';
// //import { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Button } from '@/components/ui/button';
// import { fetchSearchResults } from './api';

// const apiUrl = `https://api.search.brave.com/res/v1/web/search`;
// const token = 'BSAXH1w-j_FK7P6zu8rJ9jFtfEUbZrG';

// export default function Internet(){
  
//   // const[query,setQuery]=useState('');
//   // const[result, setResult]=useState<any>();

//  const fetchSearch = async () => {
  
//   try {
//     const results = await fetchSearchResults('Messi', 5);
//     console.log(results)


//     //setResult(results);
    
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// return(
//   <div>
    
//     {/* <input
//         className='min-h-[60px] w-[430px] resize-none bg-transparent px-3 py-[1.3rem] sm:text-sm rounded-lg' 
//          type="text"
//          value={query}
//          onChange={(e) => setQuery(e.target.value)} 
//          placeholder="Enter query"
//        /> */}
//        <Button type="submit" onClick={fetchSearch}>Search</Button>
    

//     {/* {result && ( 
        
//         <Card className="w-[580px] justify-content">
          
//           <CardHeader>
//             <CardTitle>
//             <h2 className="text-lg font-bold" >result in {result}</h2>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-500">   
//                     Date: {new Date().toLocaleString() + ''}
//             </p>
    
    
//           </CardContent>
//           <CardContent className="grid gap-4">
//               <div className="flex items-center space-x-4 rounded-md border p-4">
//                 <div className='flex-1 space-y-1 grid-cols-3'>
//                     <p className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 font-semibold" >Note: {result.extra_snippet}</p>
//                     <p className="text-xl font-semibold">Link: {result.url}</p>
//                     <p className="text-gray-500">Feels like : {result.type}</p>
//                 </div>
                
//               </div>
//               </CardContent>
          
//         </Card>
  
//     )} */}
//   </div>
// )
  



// }




