interface MessageProp {
  name: string;
  message: string;
  time: string;
  isMyMessage: boolean;
}

const Message:React.FC<MessageProp> = ({
  name,
  message,
  time,
  isMyMessage,
}) => {

  return (
    <div className={`w-fit flex flex-col gap-2.5 px-4 py-2.5 bg-gray-600 text-gray-50 rounded-[16px] ${isMyMessage && `items-end self-end`}`}>
      <p className={`
        text-subhead-16-sb transition-all-300-out
        @2xl:text-headline-20-b`}>
          {name}</p>
      <p className={`
        text-body-14-r transition-all-300-out
        @2xl:text-body-16-r`}>
          {message}</p>
      <p className={`
        text-caption-10-l text-gray-400 transition-all-300-out
        @2xl:text-caption-12-r `}>
          {time}</p>
    </div>
  )
}

export default Message;