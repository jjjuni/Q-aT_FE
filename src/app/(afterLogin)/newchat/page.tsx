'use client'

import Container from "@/components/common/Container";
import { useState } from "react";

export default function NewChat() {

  const [serverName, setServerName] = useState('');

  return (
    <Container className={`py-[60px] px-[32px] flex flex-col justify-between`}>
      <div className={`flex flex-col gap-4 px-2.5 py-2.5 pb-[70px] text-center border-b border-solid border-gray-600`}>
        <p className={`text-gray-50 text-display-32-b`}>친구들과 새로운 채팅을 시작해보세요!</p>
        <div className={`flex flex-col gap-2.5 text-body-16-r text-gray-300`}>
          <p>참여하고 싶은 채팅 서버 이름을 입력해주세요!</p>
          <p>친구를 초대해 함께하세요!</p>
        </div>
      </div>
        <div className={`flex flex-col gap-10 w-full`}>  
          <input 
            className={`text-gray-50 rounded-[12px] bg-gray-600 px-5 py-4 text-subhead-16-sb placeholder:text-gray-500`}
            placeholder="채팅 서버 이름을 입력해주세요"
            value={serverName}
            onChange={(e) => {setServerName(e.target.value)}}/>
          <button
            className={`rounded-[12px] bg-gray-50 text-gray-800 px-5 py-4 text-subhead-16-sb disabled:bg-gray-600 disabled:text-gray-500`}
            disabled={serverName.trim() === ''}>
            입장하기</button>
        </div>
    </Container>
  );
}
