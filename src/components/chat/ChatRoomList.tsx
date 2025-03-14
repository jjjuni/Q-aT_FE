import { useParams, useRouter } from "next/navigation";
import { ChatIcon } from "../../../public/svgs";

const ChatRoomList = () => {

  const router = useRouter();

  const {roomId} = useParams();

  return (
    <div className={`flex flex-col gap-1 text-gray-300 cursor-pointer`}>
      <div
        className={`flex gap-2.5 items-center px-3 py-3 rounded-[8px] hover:bg-gray-600 hover:text-gray-200 ${roomId === 'room1' ? `text-gray-50 bg-gray-600` : 'text-gray-300'}`}
        onClick={() => router.push('/room1')}>
        <ChatIcon className={`h-6`} />
        <p className={`text-subhead-16-sb`}>room1</p>
      </div>
      <div
        className={`flex gap-2.5 items-center px-3 py-3 rounded-[8px] hover:bg-gray-600 hover:text-gray-200 ${roomId === 'room2' ? `text-gray-50 bg-gray-600` : 'text-gray-300'}`}
        onClick={() => router.push('/room2')}>
        <ChatIcon className={`h-6`} />
        <p className={`text-subhead-16-sb`}>room2</p>
      </div>
      <div
        className={`flex gap-2.5 items-center px-3 py-3 rounded-[8px] hover:bg-gray-600 hover:text-gray-200 ${roomId === 'room3' ? `text-gray-50 bg-gray-600` : 'text-gray-300'}`}
        onClick={() => router.push('/room3')}>
        <ChatIcon className={`h-6`} />
        <p className={`text-subhead-16-sb`}>room3</p>
      </div>
    </div>
  )
}

export default ChatRoomList;