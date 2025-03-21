'use client'

import useAuthStore from "@/store/useAuthStore";
import { ChatIcon } from "../../../public/svgs";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import usePageInfoStore from "@/store/usePageInfoStore";

interface ChatContent {
  sender: string;
  email: string;
  message: string;
  sendAt: string;
}

interface PrevMessageData {
  pages: PrevMessagePage[];
}

interface PrevMessagePage {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    chatList: ChatContent[]
  };
}

interface MessageListProps {
  prevMessageData: PrevMessageData | undefined;
  messages: ChatContent[];
  hasNextPage: boolean;
  ref: (node?: Element | null) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  prevMessageData,
  messages,
  hasNextPage,
  ref,
}) => {

  const {
    title,
  } = usePageInfoStore();

  const {
    email,
  } = useAuthStore();

  const messageDivRef = useRef<HTMLDivElement | null>(null);

  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    if (messageDivRef.current) {

      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight - scrollDistance;
    }
  }, [prevMessageData?.pages?.length]);


  // 현재 스크롤 위치 저장
  useEffect(() => {
    const saveScroll = () => {
      if (messageDivRef.current) {
        setScrollDistance(messageDivRef.current.scrollHeight - messageDivRef.current.scrollTop)
      }
    }

    const refCurrent = messageDivRef.current;

    if (refCurrent) {
      refCurrent.addEventListener('scroll', saveScroll)
    }
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('scroll', saveScroll)
      }
    };
  }, []);

  useEffect(() => {
    if (messageDivRef.current)
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
  }, [messages])

  return (
    <div ref={messageDivRef} className={`overflow-y-auto`}>
      <div className="flex flex-col gap-4 px-5 py-2.5">
        {/* 환영 메시지 */}
        {!hasNextPage &&
          <div className={`py-2.5 border-b-2 border-solid border-gray-600`}>
            <div className={`flex gap-2.5 px-2.5 py-1 @2xl:py-2.5 justify-center`}>
              <ChatIcon className={`w-7 @2xl:w-9`} />
              <p className={`
                text-headline-20-b transition-custom mt-0.5
                @2xl:text-display-32-b @2xl:mt-0`}>
                &apos;&apos;{title}&apos;&apos; 에 오신 걸 환영합니다!</p>
            </div>
            <div className={`px-2.5 pb-2.5`}>
              <p className={`
                text-caption-12-r text-gray-300 text-center transition-custom
                @2xl:text-subhead-16-sb`}>
                &apos;&apos;{title}&apos;&apos; 이 시작된 곳이에요</p>
            </div>
          </div>
        }

        {/* refDev */}
        <div ref={ref}></div>

        {/* 이전 메시지 */}
        <div className={`flex flex-col-reverse gap-4`}>
          {prevMessageData?.pages?.map((page) => (
            page?.result?.chatList?.map((item, index) => {
              return (
                <Message
                  key={index}
                  name={item.sender}
                  message={item.message}
                  time={item.sendAt}
                  isMyMessage={item.email === email} />)
            }
            )))}
        </div>

        {/* 새로운 메시지 */}
        <div className={`flex flex-col gap-4`}>
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
    </div>
  );
};

export default MessageList;
