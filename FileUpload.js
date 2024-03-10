import React from 'react'
import './FileUpload.css';
import { useState } from 'react';



export const FileUpload = () => {
    const [file,setFile] = useState(null)

    const handleFileInputChange = (event) =>{
        // console.log(event.target.files)
        setFile(event.target.files[0])
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if (!file) {
            console.error("No file selected.");
            return;
        }
    const formData = new FormData();
    formData.append('details', file); // Add an empty JSON object for the details field
    

        try{
            const endpoint = "http://127.0.0.1:8000/upload_file"
            const response = await fetch(endpoint,{
                method: "Post",
                body:formData
            });
            if(response.ok){
                console.log("File uploaded successfully")

            }
            else{
                console.error("Failed to upload file");
            }
            
        } catch(error){
            console.error("Error uploading file:",error);
                
        }


    }
    return (
    <div>
        <h1>FileUpload</h1>
        <form onSubmit={handleSubmit}>
            <div className='onchange'>
            <input type='file' onChange={handleFileInputChange}/>
            </div>
            <button type='submit'>Upload</button>
        </form>
        
        {file && <p>{file.name}</p>}
    </div>
  )
}
