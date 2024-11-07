"use client";
import { uploadToS3 } from "@/lib/db/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] }, // Sytax to make sure users can only upload pdf files and one file maximum
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10*1024*1024) {
        alert("File size should be less than 10MB");
        return;
      }
      try {
        const data = await uploadToS3(file)
        console.log("data",data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
        style={{
          padding: "20px 0", // Thinner height
          width: "400px", // Longer width
          height: "100px", // Control height directly
        }}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-gray-500 text-sm">
            Drrop your PDF file here
          </p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
//This component does take any props rather is a client component that will be used to upload files to the server.
