
// import OpenAI from "openai";
// // Initialize the OpenAI API client with your API key
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY || "",
//   });

// // Function to parse through an uploaded file using OpenAI model
// async function parseUploadedFile(file: File): Promise<string> {
//     // Read the contents of the uploaded file
//     const fileContents = await readFile(file);

//     // Call the OpenAI API to parse the file contents
//     const response = await openai.completions.create({
//         engine: 'davinci',
//         prompt: fileContents,
//         max_tokens: 100,
//     });

//     return response.data.choices[0].text;
// }

// // Helper function to read the contents of a file
// function readFile(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             if (reader.result) {
//                 resolve(reader.result.toString());
//             } else {
//                 reject(new Error('Failed to read file'));
//             }
//         };
//         reader.readAsText(file);
//     });
// }

// // Example usage
// const uploadedFile = /* Get the uploaded file */;
// parseUploadedFile(uploadedFile)
//     .then((parsedText) => {
//         console.log(parsedText);
//     })
//     .catch((error) => {
//         console.error(error);
//     });