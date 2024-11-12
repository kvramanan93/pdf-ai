"use client";
import { uploadToS3 } from "@/lib/db/s3";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"; // used to make api call to the backend
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation' // not from next/router

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] }, // Sytax to make sure users can only upload pdf files and one file maximum
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large");
        alert("File size should be less than 10MB");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("Something is wrong with the file upload");
          return;
        }
        mutate(data, {
          onSuccess: (chat_id) => {
            toast.success("Chat created successfully");
            router.push(`/chat/${chat_id.chat_id}`);
            //console.log(data);
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
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
        {uploading || isPending ? (
          <>
            {/* Loading state */}
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">Spilling tea to GPT..</p>
          </>
        ) : (
          <>
            {/* Default state */}
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-gray-500">
              Drop your PDF file here
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
//This component does take any props rather is a client component that will be used to upload files to the server.
