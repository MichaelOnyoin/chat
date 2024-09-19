// const axios = require('axios');

// const fs = require('fs');

// const token = 'e34de50f61cf4cccb4d855509e3aadb7edb6cdc8041';

// const url = encodeURIComponent('https://hlbjimroberts.com/');

// const requestURL = `https://api.scrape.do?token=${token}&url=${url}&screenShot=true&render=true&returnJSON=true`;

// axios.get(requestURL)

//     .then(response => {

//         if (response.status === 200) {

//             const content = response.data;

//             const imageB64 = content.screenShots[0].image;

//             const filePath = 'HLB.png';

//             fs.writeFile(filePath, Buffer.from(imageB64, 'base64'), err => {

//                 if (err) {

//                     console.error(err);

//                 }

//             });

//         } else {

//             console.log(response.status);

//         }

//     })

//     .catch(error => {

//         console.error(error);

//     });