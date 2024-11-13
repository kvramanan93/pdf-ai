import { DrizzleChats } from "@/lib/db/schema";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  chats: DrizzleChats[];
  chatId: number;
};

const ChatSidebar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full min-h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-bold border-white border">
          <PlusCircleIcon className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-500 text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-9 items-center ">
        <div className="flex items-center gap-5 text-sm text-white-600 flex-wrap">
          <Link href="/">Home</Link>
          <Link href="/">Source</Link>
          {/*Stripe Button*/}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
