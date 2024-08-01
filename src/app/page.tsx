'use client';
 
import { EditDialog } from '@/components/dialog';
import { Button } from '@/components/ui/button';
import { upload } from '@vercel/blob/client';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { getUploadedList, handleDelete } from '@/services';
 
export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadedList, setUploadedList] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
  
      const file = inputFileRef.current.files[0];
  
      await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      const list = await getUploadedList();
      setUploadedList(list);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() =>{
    (async ()=>{
      const list = await getUploadedList();
      setUploadedList(list);
    })()
  },[refresh]);
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
      </form>
      <div className="w-full max-w-md mt-8">
          {uploadedList?.map((image: any, i: number) => (
            <div key={`${i}_${image.pathname}`}  className="flex items-center justify-between p-2 border-b border-gray-200">
              <a href={`${image.downloadUrl}`} className="text-blue-600 underline truncate w-3/4">
                {image.pathname}
              </a>
              <EditDialog name={image.pathname} parent={<Button> <FaPen/></Button>}/>
              <Button onClick={()=>{ handleDelete(image.url, image.pathnam), setRefresh(!refresh)}}> <FaTrash/></Button>
            </div> 
          ))}
      </div>  
    </div>
  );
}