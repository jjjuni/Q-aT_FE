'use client'

import { useParams, usePathname } from "next/navigation";
import { ChatIcon, ChatPlusIcon, FriendIcon } from "../../../public/svgs";
import { useEffect, useState } from "react";

const Header = () => {

  const pathName = usePathname();
  const { roomId } = useParams();
  const stringRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const [title, setTitle] = useState('');


  useEffect(() => {

    if (stringRoomId) {
      setTitle(stringRoomId);
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
  }, [pathName]);

  return (
    <div className={`flex items-center w-full h-[80px] px-10 py-2.5 gap-2.5 text-gray-300 border-b border-solid border-gray-600`}>
      {title === '새로운 채팅' && <ChatPlusIcon className={`w-9`} />}
      {title === '친구' && <FriendIcon className={`w-6`} />}
      {title === stringRoomId && <ChatIcon className={`w-9`} />}

      <p className={`text-display-24-b`}>{title}</p>
    </div>
  )
}

export default Header;