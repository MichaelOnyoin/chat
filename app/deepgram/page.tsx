'use client'
import React, { useState } from 'react';

const PromptForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('image/api/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Analysis result:', result);
        } else {
          console.error('Error analyzing image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col mb-6'>
        <label className='mb-2 text-sm font-medium'>Upload Image</label>
        <input
          type='file'
          accept='image/*'
          className='text-sm border rounded-lg cursor-pointer'
          onChange={handleFileChange}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default PromptForm;
