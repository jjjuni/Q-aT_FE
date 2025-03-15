'use client'

import { usePathname, useRouter } from "next/navigation";
import { ChatIcon, ChatPlusIcon, FriendIcon } from "../../../public/svgs";
import ChatRoomList from "../chat/ChatRoomList";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

const Sidebar = () => {

  const router = useRouter();

  const pathName = usePathname();

  const {
    setUser,
  } = useAuthStore();

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className={`py-2.5 flex flex-col gap-2.5 bg-gray-800 w-[300px] h-screen shrink-0 rounded-tr-[16px]`}>
      <div 
        className={`px-5 text-display-28-b h-[60px] content-center cursor-pointer`}
        onClick={() => router.push('/home')}>
        로고
      </div>
      {/* 사이드바 메뉴 */}
      <div className={`flex flex-col gap-1 px-5`}>
        {/* 사이드바 상위 메뉴 */}
        <div className={`flex flex-col gap-1 pb-2.5 w-full border-b border-solid border-gray-600`}>
          <div
            className={`flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full text-headline-20-b cursor-pointer hover:bg-gray-600 hover:text-gray-200 ${pathName === '/newchat' ? `text-gray-50 bg-gray-600` : `text-gray-300`}`}
            onClick={() => router.push('/newchat')}>
            <ChatPlusIcon className={`w-6`} />
            <p>새로운 채팅</p>
          </div>
          <div 
            className={`flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full text-headline-20-b cursor-pointer hover:bg-gray-600 hover:text-gray-200 ${pathName === '/friend' ? `text-gray-50 bg-gray-600` : `text-gray-300`}`}
            onClick={() => router.push('/friend')}>
            <FriendIcon className={`w-6`} />
            <p>친구</p>
          </div>
        </div>
        {/* 사이드바 하위 메뉴 */}
        <div className={`flex flex-col gap-2.5 w-full py-2.5`}>
          {/* 채팅 목록 타이틀 */}
          <div className={`flex gap-2.5 text-gray-300 items-center px-2`}>
            <p className={`text-headline-20-b`}>채팅방</p>
            <ChatIcon className={`h-5`} />
          </div>
          {/* 채팅 목록 */}
          <ChatRoomList/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
