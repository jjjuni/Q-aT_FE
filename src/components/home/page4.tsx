import { motion } from "framer-motion";
import { RefObject } from "react";
import { ChatPlusIcon, LeftArrowIcon, Logo } from "../../../public/svgs";
import Image from "next/image";

interface Page4Prop {
  sectionRefs: RefObject<HTMLElement[]>
}

const Page4: React.FC<Page4Prop> = ({
  sectionRefs
}) => {

  const INDEX = 3;

  return (
    <motion.section
      ref={(el) => {
        if (el) sectionRefs.current[INDEX] = el;
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0 * 0.1 }}
      className={`w-screen h-screen flex flex-col justify-center items-center gap-[40px]`}>
      <div className={`flex flex-col items-center gap-5 w-[260px] text-center`}>
        <div className={`flex gap-2.5 text-gray-50`}>
          <ChatPlusIcon className={`w-9`} />
          <p className={`text-display-32-b`}>채팅방 생성</p>
        </div>
        <p className={`text-headline-20-m text-gray-300`}>원하는 이름의 채팅방을 생성하고 친구를 초대해 함께해요!</p>
      </div>
      <Image
        src={"/images/chat_ex.webp"}
        alt="채팅방"
        width={2000}
        height={2000}
        className={`w-[55%]`} />
    </motion.section>
  )
}

export default Page4;