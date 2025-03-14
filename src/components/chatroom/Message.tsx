interface MessageProp {
  name: string;
  message: string;
  time: string;
}

const Message:React.FC<MessageProp> = ({
  name,
  message,
  time,
}) => {
  return (
    <div className={`w-fit flex flex-col gap-2.5 px-4 py-2.5 bg-gray-600 text-gray-50 rounded-[16px]`}>
      <p className={`text-headline-20-m`}>{name}</p>
      <p className={`text-body-16-r`}>{message}</p>
      <p className={`text-caption-12-r text-gray-400`}>{time}</p>
    </div>
  )
}

export default Message;