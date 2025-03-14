import { ChatPlusIcon } from "../../../public/svgs";


const Sidebar = () => {


  return (
    <div className={`py-2.5 flex flex-col gap-2.5 bg-gray-800 w-[300px] h-screen rounded-tr-[16px]`}>
      <div className={`px-5 text-display-28-b h-[60px] content-center`}>
        로고
      </div>
      <div className={`flex flex-col gap-1 pb-2.5 px-5 w-full border-b border-solid border-gray-600`}>
        <div className={`flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full text-gray-300 text-headline-20-b cursor-pointer hover:bg-gray-600`}>
          <ChatPlusIcon className={`w-6`}/>
          <p>새로운 채팅</p>
        </div>
        <div className={`flex gap-2.5 px-2.5 rounded-[8px] py-2.5 w-full text-gray-300 text-headline-20-b cursor-pointer hover:bg-gray-600`}>
          <ChatPlusIcon className={`w-6`}/>
          <p>친구</p>
        </div>
        <div className={`flex gap-2.5 w-full`}>

        </div>
      </div>
    </div>
  )
}

export default Sidebar;