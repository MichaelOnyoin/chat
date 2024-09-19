import axios from 'axios';

export async function POST(req: Request){
    const input: {
        query: string | null;
      
      } = await req.json();

 await axios.get('https://api.search.brave.com/res/v1/web/search', {
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
    return search
  })
  .catch(error => {
    console.log(error);
  });
  
 

}