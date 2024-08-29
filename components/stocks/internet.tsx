'use client'
import axios from 'axios';
import cheerio from 'cheerio';

export  function SearchInternet(query: string){
    const url = `https://www.google.com/search?q=${query}`;
    const Search = async () =>{
    try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            // Extract the information you need from the website
            // For example, find and print the first search result
            const searchResults = $('h3.search-result-title');
            if (searchResults.length > 0) {
                const firstResult = searchResults.first().text();
                console.log(firstResult);
            } else {
                console.log("No search results found.");
            }
        } else {
            console.log("Failed to retrieve search results.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    Search()
   }
}

// Example usage
export default SearchInternet("AI technology");

