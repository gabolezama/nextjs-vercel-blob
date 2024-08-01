'use client';
 
import { upload } from '@vercel/blob/client';
import Image from 'next/image';
import { useState, useRef, FormEvent } from 'react';
 
export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadedList, setUploadedList] = useState<any>([]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
  
      if (!inputFileRef.current?.files) {
        throw new Error('No file selected');
      }
      
      if (inputFileRef.current?.size > 5 * 1024 * 1024) {
        throw new Error('El archivo es mayor a 5MB');
      }
  
      const file = inputFileRef.current.files[0];
  
      await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      const response = await fetch('/api/read')
      const {blobs: list} = await response.json();
      
      setUploadedList(list);
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center mt-20 space-y-6">
      <h1 className="text-3xl font-bold">Upload Your Avatar</h1>

      <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          required
          className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Upload
        </button>

        {uploadedList?.map((image: any) => (
          <Image
            priority
            key={image.pathname}
            src={image.url}
            alt="Image"
            width={200}
            height={200}
          />
        ))}
      </form>
    </div>
  );
}