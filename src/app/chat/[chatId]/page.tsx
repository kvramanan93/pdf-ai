import React, { use } from "react";
import {auth} from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};

//Async - server component banane ke liye

const chatPage = async ({ params: { chatId } }: Props) => {
  const{userId} = await auth()
  if(!userId){ 
    return redirect('/sign-in')
  }
  //const 
  return <div>{chatId}</div>;
};

export default chatPage;
