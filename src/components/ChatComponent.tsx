/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  // Create a reference for the bottom of the message list, with explicit type
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="flex-shrink-0 p-2 bg-white">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <MessageList messages={messages} />
        {/* Dummy div to scroll to the bottom */}
        <div ref={bottomRef} />
      </div>

      {/* Input form at the bottom */}
      <form
        onSubmit={handleSubmit}
        className="flex-shrink-0 p-4 bg-white border-t border-gray-200"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any Question..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
