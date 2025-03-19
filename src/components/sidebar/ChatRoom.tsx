import { useParams, useRouter } from "next/navigation";
import { ChatIcon, XIcon } from "../../../public/svgs";
import useModalStore from "@/store/useModalStore";
import { MouseEvent, useState } from "react";
import { axiosInstance } from "@/apis/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

interface ChatRoomProps {
  roomUuid: string;
  roomName: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  roomUuid,
  roomName,
}) => {

  const { roomUuid: currentParam } = useParams();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  const exitChatRoom = async () => {
    try {
      await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/chat-room/${roomUuid}`)
      queryClient.invalidateQueries({ queryKey: ['getUserChatRooms'] })
      setIsAlertModalOpen(false);
      setAlertModalText("");
      setAlertModalFn(() => {return null})

      if (currentParam === roomUuid) {
        router.push('/home')
      }

    } catch (e) {
      console.log(e);
    }
  }

  const {
    setIsAlertModalOpen,
    setAlertModalText,
    setAlertModalFn,
  } = useModalStore();

  const handleXButton = (e: MouseEvent) => {
    e.stopPropagation();
    setAlertModalText("정말 나갈거에요...?");
    setAlertModalFn(exitChatRoom)
    setIsAlertModalOpen(true);
  }

  return (
    <div
      className={`flex items-center justify-between px-3 py-3 rounded-[8px] hover:bg-gray-600 hover:text-gray-50 ${roomUuid === currentParam ? `text-gray-200 bg-gray-600` : 'text-gray-300'}`}
      onClick={() => router.push(`/${roomUuid}`)}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}>
      <div className={`flex gap-2.5 items-center`}>
        <ChatIcon className={`h-6`} />
        <p className={`text-subhead-16-sb`}>{roomName}</p>
      </div>
      <div
        onClick={(e) => handleXButton(e)}>
        <XIcon className={`w-6 hover:text-point ${isMouseOver ? `` : `hidden`}`} />
      </div>
    </div>
  )
}

export default ChatRoom;