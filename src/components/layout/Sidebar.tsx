'use client'

import { usePathname, useRouter } from "next/navigation";
import { ChatIcon, ChatPlusIcon, FriendIcon, LeftArrowIcon, Logo } from "../../../public/svgs";
import ChatRoomList from "../sidebar/ChatRoomList";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axiosInstance";
import useSidebarStore from "@/store/useSidebarStore";
import { AnimatePresence, motion } from "framer-motion";

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

    const width = window.innerWidth;
    if (width < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen &&
          <motion.div
            className={`
              md:hidden
              fixed inset-0 z-[490] flex items-center justify-center bg-[rgba(0,0,0,0.3)]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSidebarOpen(false)}>
          </motion.div>
        }
      </AnimatePresence>
      <div className={`
      ${isSidebarOpen ? `left-0` : `@2xl:left-[-300px] left-[-250px]`} 
      z-[500] w-[250px] fixed py-2.5 flex flex-col gap-2.5 bg-gray-800 min-h-full shrink-0 rounded-tr-[16px] transition-all duration-700 ease-out
      @2xl:w-[300px]`}>
        <div
          className={`
          flex justify-between items-center px-7 text-display-24-b h-[40px] content-center text-gray-300 transition-custom z-[500]
          @2xl:text-display-28-b @2xl:h-[60px]`}>

          <Logo
            className={`w-[70px] @2xl:w-[92px] cursor-pointer transition-custom`}
            onClick={() => router.push('/home')} />

          <LeftArrowIcon
            className={`w-5 @2xl:w-6 cursor-pointer hover:text-gray-50 transition-custom`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
        {/* 사이드바 메뉴 */}
        <div className={`flex flex-col gap-1 px-5`}>
          {/* 사이드바 상위 메뉴 */}
          <div className={`flex flex-col gap-1 pb-2.5 w-full border-b border-solid border-gray-600`}>
            <div
              className={`
              text-subhead-16-sb flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full cursor-pointer hover:bg-gray-600 hover:text-gray-200 transition-custom
              ${pathName === '/newchat' ? `text-gray-50 bg-gray-600` : `text-gray-300`}
              @2xl:text-headline-20-b`}
              onClick={() => router.push('/newchat')}>
              <ChatPlusIcon className={`w-5 @2xl:w-6 transition-custom`} />
              <p>새로운 채팅</p>
            </div>
            <div
              className={`
              text-subhead-16-sb flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full cursor-pointer hover:bg-gray-600 hover:text-gray-200 transition-custom
              ${pathName === '/friend' ? `text-gray-50 bg-gray-600` : `text-gray-300`}
              @2xl:text-headline-20-b`}
              onClick={() => router.push('/friend')}>
              <FriendIcon className={`w-5 @2xl:w-6 transition-custom`} />
              <p>친구</p>
            </div>
          </div>
          {/* 사이드바 하위 메뉴 */}
          <div className={`flex flex-col gap-2.5 w-full py-2.5`}>
            {/* 채팅 목록 타이틀 */}
            <div className={`flex gap-2.5 text-gray-300 items-center px-2`}>
              <p className={`text-subhead-16-sb @2xl:text-headline-20-b transition-custom`}>채팅방</p>
              <ChatIcon className={`w-5 @2xl:w-6 transition-custom`} />
            </div>
            {/* 채팅 목록 */}
            <ChatRoomList
              data={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
