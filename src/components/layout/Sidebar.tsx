'use client'

import { usePathname, useRouter } from "next/navigation";
import { ChatIcon, ChatPlusIcon, FriendIcon, LeftArrowIcon } from "../../../public/svgs";
import ChatRoomList from "../sidebar/ChatRoomList";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axiosInstance";
import useSidebarStore from "@/store/useSidebarStore";

const Sidebar = () => {

  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = useSidebarStore();

  const router = useRouter();

  const pathName = usePathname();

  const getUserChatRooms = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/chat-room`)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  const {
    data,
  } = useQuery({
    queryKey: ['getUserChatRooms'],
    queryFn: getUserChatRooms,
  })

  const {
    setUser,
  } = useAuthStore();

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className={`
      ${isSidebarOpen ? `` : `translate-x-[-250px] lg:translate-x-[-300px]`} 
      w-[250px] fixed py-2.5 flex flex-col gap-2.5 bg-gray-800 min-h-full shrink-0 rounded-tr-[16px] transition-custom 
      lg:w-[300px]`}>
      <div
        className={`
          flex justify-between items-center px-7 text-display-24-b h-[40px] content-center text-gray-300 transition-custom
          lg:text-display-28-b lg:h-[60px]`}>
        <div 
          className={`cursor-pointer hover:text-gray-50`}
          onClick={() => router.push('/home')}>
          로고
        </div>
        <LeftArrowIcon 
          className={`w-5 lg:w-6 cursor-pointer hover:text-gray-50 transition-custom`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
      </div>
      {/* 사이드바 메뉴 */}
      <div className={`flex flex-col gap-1 px-5`}>
        {/* 사이드바 상위 메뉴 */}
        <div className={`flex flex-col gap-1 pb-2.5 w-full border-b border-solid border-gray-600`}>
          <div
            className={`
              text-subhead-16-sb flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full cursor-pointer hover:bg-gray-600 hover:text-gray-200 ${pathName === '/newchat' ? `text-gray-50 bg-gray-600` : `text-gray-300`}
              lg:text-headline-20-b`}
            onClick={() => router.push('/newchat')}>
            <ChatPlusIcon className={`w-5 lg:w-6 transition-custom`} />
            <p>새로운 채팅</p>
          </div>
          <div
            className={`
              text-subhead-16-sb flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full cursor-pointer hover:bg-gray-600 hover:text-gray-200 ${pathName === '/friend' ? `text-gray-50 bg-gray-600` : `text-gray-300`}
              lg:text-headline-20-b`}
            onClick={() => router.push('/friend')}>
            <FriendIcon className={`w-5 lg:w-6 transition-custom`} />
            <p>친구</p>
          </div>
        </div>
        {/* 사이드바 하위 메뉴 */}
        <div className={`flex flex-col gap-2.5 w-full py-2.5`}>
          {/* 채팅 목록 타이틀 */}
          <div className={`flex gap-2.5 text-gray-300 items-center px-2`}>
            <p className={`text-subhead-16-sb lg:text-headline-20-b`}>채팅방</p>
            <ChatIcon className={`w-5 lg:w-6 transition-custom`} />
          </div>
          {/* 채팅 목록 */}
          <ChatRoomList 
            data={data}/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
