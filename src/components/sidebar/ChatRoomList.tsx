import ChatRoom from "./ChatRoom";

interface ChatRoomInfo {
  roomName: string;
  roomUuid: string;
}

interface ChatRoomListProps {
  data: {
    result: ChatRoomInfo[];
  }
}

const ChatRoomList:React.FC<ChatRoomListProps> = ({
  data
}) => {

  return (
    <div className={`flex flex-col gap-1 text-gray-300 cursor-pointer`}>

      {data?.result?.map((item, index) => (
        <ChatRoom
          key={index}
          roomUuid={item.roomUuid}
          roomName={item.roomName}
        />
      ))}
    </div>
  )
}

export default ChatRoomList;