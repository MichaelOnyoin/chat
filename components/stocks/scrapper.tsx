'use client'
// import axios from 'axios';

// import { useState } from "react";


// export function Scrapper(){
// const [scrap, setScrap] = useState('');
// const token = "e34de50f61cf4cccb4d855509e3aadb7edb6cdc8041";

// const targetUrl = encodeURIComponent("https://httpbin.co/ip"); 
// const render = "true";

// const config = {

//     'method': 'GET',

//     'url': `https://api.scrape.do?token=${token}&url=${targetUrl}&render=${render}`,

//     'headers': {}

// };

// axios(config)

//     .then( (response)=> {
        

//         console.log(response.data);
//         setScrap(response.data)

//     })

//     .catch( (error)=> {

//         console.log(error);

//     });

//     return <html>
//         <div>
//             <h2>Results: </h2>
//             <p>
                
//                 {/* {Scrapper()} */}
//                 {scrap}
//             </p>
//         </div>
//            </html>
// }
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from "react";

// interface Config {
//   method: string;
//   url: string;
//   headers: {};
// }

export function Scrapper(){
const [scrap, setScrap] = useState<any>('');
const token: string = "e34de50f61cf4cccb4d855509e3aadb7edb6cdc8041";
const targetUrl: string = encodeURIComponent("https://httpbin.co/ip");
const render: string = "true";
const returnJson = "true";

const  fetchScrapper =async()=>{
const config= {
  method: 'GET',
  url: `https://api.scrape.do?token=${token}&url=${targetUrl}`,
  headers: {}
};
try{
    
await axios(config)
  .then((response) => {
    console.log(response.data);
    return setScrap(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
}catch(e){
    console.log(e);
}
  //Scrapper()
}
  return (<div>
    {/* <Button onClick={fetchScrapper}>Scrap website</Button> */}
        <p>Scrapper Result</p>
         {fetchScrapper()}

          {scrap && (
            <div>
                <p>Scrapper Result</p>
                <p>{scrap.search('ip')}</p>
                <p>{scrap.name}</p>
                {}
            </div>   
    
          )}
         
        </div>
        )

}