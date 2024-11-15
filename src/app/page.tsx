/* eslint-disable @typescript-eslint/no-unused-vars */
// Corrected version of Home component
"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
//import { GimmeChatId } from "@/app/chat/[chatId]/page";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-3xl font-semibold">Know your PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isSignedIn && (
              <Link href={`/chat/1`}>
                <Button>Go to Chats</Button>
              </Link>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Unlock insights from your PDFs effortlessly with cutting-edge SOA AI
            technology. Extract valuable information and discover new details
            seamlessly
          </p>
          <div>
            {isSignedIn ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login in to upload file
                  <LogIn className="w-1 h-1 ml--1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
