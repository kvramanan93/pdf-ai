/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { chats } from "../../../lib/db/schema";
import { db } from "../../../lib/db";
import { auth } from "@clerk/nextjs/server";
import { loads3intoPinecone } from "../../../lib/pinecone";
import { getS3Url } from "@/lib/db/s3";

// api for create chat

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    const pages = await loads3intoPinecone(file_key);
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfURL: getS3Url(file_key),
        userID: userId,
      })
      .returning({
        insertedId: chats.id,
      });
    return NextResponse.json(
      { chat_id: chat_id[0].insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
