'use client'

import { axiosInstance } from "@/apis/axiosInstance";
import Container from "@/components/common/Container";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

interface error {
  response: {
    data: {
      code: string;
      isSuccess: boolean;
      message: string;
    }
  }
}

export default function NewChatPage() {

  const queryClient = useQueryClient();

  const router = useRouter();

  const [chatRoomName, setChatRoomName] = useState('');
  const [chatRoomUuid, setChatRoomUuid] = useState('');

  const createChatRoom = async () => {
    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DOMAIN}/chat-room`,
        {
          roomName: chatRoomName,
        }
      )
      const roomUuid = response.data.result.roomUuid
      queryClient.invalidateQueries({ queryKey: ["getUserChatRooms"]});
      router.push(`/${roomUuid}`)

    } catch (e) {
      console.log(e)
    }
  }

  const joinChatRoom = async () => {
    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DOMAIN}/chat-room/${chatRoomUuid}`)
      const roomUuid = response.data.result.roomUuid
      queryClient.invalidateQueries({ queryKey: ["getUserChatRooms"]});
      router.push(`/${roomUuid}`)
    } catch (e) {
      const error = e as AxiosError<error['response']['data']>;
      if (error.response?.data.code === 'ROOM4001') {
        alert('존재하지 않는 채팅방입니다');
      } else if (error.response?.data.code === 'ROOM4002'){
        alert('이미 참여한 채팅방입니다');
      } 
    }
  }

  const handleButton = (e:MouseEvent, fn: () => void) => {
    e.stopPropagation();
    fn();
  }

  return (
    <Container className={`py-[60px] px-[32px] flex flex-col justify-between`}>
      <div>
        <div className={`flex flex-col gap-4 px-2.5 py-2.5 pb-[40px] text-center border-b border-solid border-gray-600`}>
          <p className={`text-gray-50 text-display-32-b`}>새로운 서버를 생성해 채팅을 시작해보세요!</p>
          <div className={`flex flex-col gap-2.5 text-body-16-r text-gray-300`}>
            <p>참여하고 싶은 채팅 서버 이름을 입력해주세요!</p>
            <p>친구를 초대해 함께하세요!</p>
          </div>
        </div>
        <div className={`flex flex-col gap-10 w-full`}>
          <input
            className={`text-gray-50 rounded-[12px] bg-gray-600 px-5 py-4 text-subhead-16-sb placeholder:text-gray-500`}
            placeholder="채팅 서버 이름을 입력해주세요"
            value={chatRoomName}
            onChange={(e) => { setChatRoomName(e.target.value) }} />
          <button
            className={`rounded-[12px] bg-gray-50 text-gray-800 px-5 py-4 text-subhead-16-sb disabled:bg-gray-600 disabled:text-gray-500`}
            onClick={(e) => handleButton(e, createChatRoom)}
            disabled={chatRoomName.trim() === ''}>
            입장하기</button>
        </div>
      </div>

      <div>
        <div className={`flex flex-col gap-4 px-2.5 py-2.5 pb-[40px] text-center border-b border-solid border-gray-600`}>
          <p className={`text-gray-50 text-display-32-b`}>기존의 서버에 참여해 채팅을 시작해보세요!</p>
          <div className={`flex flex-col gap-2.5 text-body-16-r text-gray-300`}>
            <p>참여하고 싶은 채팅 서버 ID를 입력해주세요</p>
          </div>
        </div>
        <div className={`flex flex-col gap-10 w-full`}>
          <input
            className={`text-gray-50 rounded-[12px] bg-gray-600 px-5 py-4 text-subhead-16-sb placeholder:text-gray-500`}
            placeholder="채팅 서버 ID를 입력해주세요"
            value={chatRoomUuid}
            onChange={(e) => { setChatRoomUuid(e.target.value) }} />
          <button
            className={`rounded-[12px] bg-gray-50 text-gray-800 px-5 py-4 text-subhead-16-sb disabled:bg-gray-600 disabled:text-gray-500`}
            onClick={(e) => handleButton(e, joinChatRoom)}
            disabled={chatRoomUuid.trim() === ''}>
            입장하기</button>
        </div>
      </div>

    </Container>
  );
}
