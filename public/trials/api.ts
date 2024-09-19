import axios from 'axios';


const apiUrl = `https://api.search.brave.com/res/v1/web/search`;
const token = 'BSAXH1w-j_FK7P6zu8rJ9jFtfEUbZrG';

export const fetchSearchResults = async (query: string, count: number) => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': token
      },
      params: {
        q: query,
        count,
        extra_snippets: true
      }
    }).then(response => {
      console.log(response.data.web.results);
      const search =response.data.web.results.json();
     
    })
    //console.log(response.data.web.results);
    //return response.data.web.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};


// export const fetchSearchResults = async (query: string, count: number) => {
//   try {
//     const response = await fetch(`${apiUrl}?q=${query}&count=${count}&extra_snippets=true`, {
//       headers: {
//         'Accept': '*/*',
//         'Accept-Encoding': 'gzip',
//         'X-Subscription-Token': token
//       }
//     });
//     const data = await response.json();
//     return data.web.results;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };