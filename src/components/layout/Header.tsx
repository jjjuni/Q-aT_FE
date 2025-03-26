'use client'

import { useParams, usePathname, useRouter } from "next/navigation";
import { ChatIcon, ChatPlusIcon, FriendIcon, MenuIcon } from "../../../public/svgs";
import { useEffect } from "react";
import { axiosInstance } from "@/apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import usePageInfoStore from "@/store/usePageInfoStore";
import { AxiosError } from "axios";
import useSidebarStore from "@/store/useSidebarStore";

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
    isSidebarOpen,
    setIsSidebarOpen,
  } = useSidebarStore();

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
    <div className={`
      h-[60px] flex items-center w-full pl-5 pr-10 py-2.5 gap-5 text-gray-300 border-b border-solid border-gray-600 transition-all-300-out
      @2xl:h-[80px]`}>
      <MenuIcon 
        className={`w-7 @2xl:w-9 cursor-pointer hover:text-gray-50 transition-all-300-out`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
      <div className={`flex gap-2.5 items-center `}>
        {title === '새로운 채팅' && <ChatPlusIcon className={`w-7 @2xl:w-9 transition-all-300-out`} />}
        {title === '친구' && <FriendIcon className={`w-5 @2xl:w-6 transition-all-300-out`} />}
        {title === stringRoomUuid && <ChatIcon className={`w-7 @2xl:w-9 transition-all-300-out`} />}

        <p className={`mt-0.5 text-headline-20-b @2xl:mt-1 @2xl:text-display-24-b transition-all-300-out`}>{title}</p>
      </div>
    </div>
  )
}

export default Header;