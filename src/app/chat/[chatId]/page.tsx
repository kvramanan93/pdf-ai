import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { chats } from "@/lib/db/schema";
import { db } from "../../../lib/db";
import ChatSidebar from "../../../components/ChatSidebar";
import { eq } from "drizzle-orm";
import PDFViewer from "../../../components/PDFViewer";
import ChatComponent from "../../../components/ChatComponent";

type Props = {
  params: {
    chatId: string;
  };
};

/*
export async function GimmeChatId() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userID, userId));
  if (_chats && _chats.length > 0) {
    return _chats[0].id;
  }
}
  */

//Async - server component banane ke liye

const chatPage = async ({ params }: Props) => {
  const { chatId } = await params;
  // New nextJs update will issue warning if not used await on params, Check
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userID, userId));
  // _chats the list of chats thats returned from database and chats is the list from schema, these two are different
  if (!_chats) {
    return redirect("/");
  }

  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

  return (
    <div className="flex max-h-screen overflow-hidden">
      <div className="flex w-full max-h-screen overflow-hidden">
        {/*Chat sidebar*/}
        <div className="flex-[1] max-w-xs">
          {<ChatSidebar chats={_chats} chatId={parseInt(chatId)} />}
        </div>
        {/*pdf viewer*/}
        <div className="max-h-screen p-4 overflow-hidden flex-[5]">
          {<PDFViewer pdf_url={currentChat?.pdfURL || ""} />}
        </div>
        {/*Chat component*/}
        <div className="flex-[3] border-1-4 border-1-slate-200">
          {<ChatComponent />}
        </div>
      </div>
    </div>
  );
};

export default chatPage;
