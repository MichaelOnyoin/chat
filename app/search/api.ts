import axios from 'axios';

export default function Search(query:string):any{

axios.get('https://api.search.brave.com/res/v1/web/search', {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': 'BSAXH1w-j_FK7P6zu8rJ9jFtfEUbZrG'
    },
    params: {
        q: query,
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
    console.log('Search Title',title);
    console.log('Url', url);

    console.log('Search Result Json',search,  
      'description',describe);
    
    

    const result = response.data.web.results[0];
    return result
    
  })
  .catch(error => {
    console.log(error);
  });
  
}
  
    
  

