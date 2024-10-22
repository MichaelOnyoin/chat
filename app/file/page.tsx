"use client";
import { FormEvent, useState } from "react";

export default function FileUpload  () {
  const [file, setFile] = useState<string>();
  const [fileEnter, setFileEnter] = useState(false);
  const [ openAIResponse, setOpenAIResponse ] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(file === "") {
      alert("Upload an file.")
      return;
    }

    // POST api/analyzefile
    await fetch("image/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        file: file // base64 file
        
      })
      
    })
    .then(async (response: any) => {
      // Because we are getting a streaming text response
      // we have to make some logic to handle the streaming text
      const reader = response.body?.getReader();
      setOpenAIResponse("");
      // reader allows us to read a new piece of info on each "read"
      // "Hello" + "I am" + "Cooper Codes"  reader.read();
      while (true) {
        const { done, value } = await reader?.read();
        // done is true once the response is done
        if(done) {
          break;
        }

        // value : uint8array -> a string.
        var currentChunk = new TextDecoder().decode(value);
        setOpenAIResponse((prev) => prev + currentChunk);
      }
    });

  }




  return (
    <div className="container px-4 max-w-5xl mx-auto">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              Array.from(e.dataTransfer.items).forEach((item, i) => {

                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    let blobUrl = URL.createObjectURL(file);
                    setFile(blobUrl);
                  }
                  console.log(`items file[${i}].name = ${file?.name}`);
                }
              });
            } else {
              Array.from(e.dataTransfer.files).forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
        >
          <label
            htmlFor="file"
            className="h-full flex flex-col justify-center text-center text-500-blue"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              console.log(e.target.files);
              let files = e.target.files;
              if (files && files[0]) {
                let blobUrl = URL.createObjectURL(files[0]);
                setFile(blobUrl);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <object
            className="rounded-md w-full max-w-xs h-72"
            data={file}
            //type="file/png" //need to be updated based on type of file
          />
          <button
            // onClick={() => setFile("")}
            onClick={()=>handleSubmit}
            className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
          >
            Reset
          </button>
        </div>
      )}

       {openAIResponse !== "" ?
        <div className="border-t border-gray-300 pt-4 ">
          <h2 className="text-xl font-bold mb-2">AI Response</h2>
          <p>{openAIResponse}</p>
        </div>
        :
        null
        }
        
    </div>

  
  
  );
};