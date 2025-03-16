'use client'

import { Dispatch, SetStateAction } from "react"

interface MessageInputProps {
  messageInputText: string;
  setMessageInputText: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
}

const MessageInput:React.FC<MessageInputProps> = ({
  messageInputText,
  setMessageInputText,
  sendMessage,
}) => {

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작(새 줄 입력)을 막음
      sendMessage(); // Enter 키가 눌리면 메시지 전송
    }
  };

  return (
    <div className={`px-5 py-5 w-full`}>
      <input
        className={`w-full rounded-[16px] px-5 py-4 bg-gray-600 text-subhead-16-sb text-gray-50 placeholder:text-gray-500`}
        placeholder="메시지를 입력해주세요"
        value={messageInputText}
        onKeyDown={handleKeyDown}
        onChange={(e) => {setMessageInputText(e.target.value)}}
        />
    </div>
  )
}

export default MessageInput;