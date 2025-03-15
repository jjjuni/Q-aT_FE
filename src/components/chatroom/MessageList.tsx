'use client'

import useAuthStore from "@/store/useAuthStore";
import { ChatIcon } from "../../../public/svgs";
import Message from "./Message";
import { useEffect, useRef } from "react";

interface ChatContent {
  sender: string;
  email: string;
  message: string;
  sendAt: string;
}

interface MessageListProps {
  messages: ChatContent[];
}

const MessageList: React.FC<MessageListProps> = ({
  messages
}) => {

  const {
    email,
  } = useAuthStore();

  const messageDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageDivRef.current)
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
  }, [messages])

  return (
    <div ref={messageDivRef} className={`overflow-y-auto`}>
      <div className="flex flex-col gap-4 px-5 py-2.5">
        {/* 환영 메시지 */}
        <div className={`py-2.5 border-b-2 border-solid border-gray-600`}>
          <div className={`flex gap-2.5 px-2.5 py-2.5 justify-center`}>
            <ChatIcon className={`w-9`} />
            <p className={`text-display-32-b`}>&apos;&apos;room1&apos;&apos; 에 오신 걸 환영합니다!</p>
          </div>
          <div className={`px-2.5 pb-2.5`}>
            <p className={`text-subhead-16-sb text-gray-300 text-center`}>&apos;&apos;room1&apos;&apos; 이 시작된 곳이에요</p>
          </div>
        </div>
        {messages?.map((item, index) => {
          return (
            <Message
              key={index}
              name={item.sender}
              message={item.message}
              time={item.sendAt}
              isMyMessage={item.email === email} />)
        })}
      </div>
    </div>
  );
};

export default MessageList;
