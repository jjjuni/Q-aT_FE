'use client'

import { useParams, usePathname, useRouter } from "next/navigation";
import { ChatIcon, ChatPlusIcon, FriendIcon } from "../../../public/svgs";
import { useEffect } from "react";
import { axiosInstance } from "@/apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import usePageInfoStore from "@/store/usePageInfoStore";
import { AxiosError } from "axios";

interface ErrorResponse {
  code: string;
  message: string;
}

const Header = () => {

  const pathName = usePathname();
  const { roomUuid } = useParams();
  const stringRoomUuid = Array.isArray(roomUuid) ? roomUuid[0] : roomUuid;

  const router = useRouter();

  const {
    title,
    setTitle,
  } = usePageInfoStore();

  const getChatRoomInfo = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/chat-room/${stringRoomUuid}`)
      return response.data;
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      if (error.response?.data.code === 'ROOM4003') {
        // 추후에 모달 창 추가 할 예정
        router.push('/home');
      }
    }
  }

  const {
    data: chatRoomInfoData,
  } = useQuery({
    queryKey: ['chatRoomInfo', stringRoomUuid],
    queryFn: getChatRoomInfo,
    enabled: !!stringRoomUuid,
  });

  useEffect(() => {

    if (stringRoomUuid) {
      setTitle(chatRoomInfoData?.result?.roomName);
    } else {
      switch (pathName) {
        case '/newchat':
          setTitle('새로운 채팅')
          break;

        case '/home':
          setTitle('홈')
          break;

        case '/friend':
          setTitle('친구')
          break;

        default:
          break;
      }
    }
  }, [pathName, chatRoomInfoData]);

  return (
    <div className={`flex items-center w-full h-[80px] px-10 py-2.5 gap-2.5 text-gray-300 border-b border-solid border-gray-600`}>
      {title === '새로운 채팅' && <ChatPlusIcon className={`w-9`} />}
      {title === '친구' && <FriendIcon className={`w-6`} />}
      {title === stringRoomUuid && <ChatIcon className={`w-9`} />}

      <p className={`text-display-24-b`}>{title}</p>
    </div>
  )
}

export default Header;