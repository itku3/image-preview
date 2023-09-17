"use client"
import { useRef, useState } from "react";

export default function Home() {
  const imgRef =useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<string | null>(null);

  const handleImage = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // @ts-ignore
    const file = imgRef.current?.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const originalWidth = img.width;
        //const originalHeight = img.height;
        const croppedHeight = 500;

        canvas.width = originalWidth;
        canvas.height = croppedHeight;

        // 상단 500px만 그리기
        ctx?.drawImage(img, 0, 0, originalWidth, croppedHeight, 0, 0, originalWidth, croppedHeight);

        const croppedDataURL = canvas.toDataURL();
        setImgFile(croppedDataURL);
      };
        e.target.value = "";
    };
        // @ts-ignore
    reader.readAsDataURL(file);
    //console.log(file);
  }

  const handleLabel = (e : any) => {
    imgRef.current?.click();  
  }

  return (
    <main className="flex justify-center items-center h-screen flex-col">
      <h1 className="font-bold my-3">PercyLN Preview</h1>
      {
        imgFile && (
        <img
          src={imgFile}
          alt="preview"
          className="w-auto h-auto"
        />
        )
      }
        <button className="my-3 cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={handleLabel}>Image Upload</button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imgRef}
          onChange={handleImage}
        /> 
    </main>
  )
}
