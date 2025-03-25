import { motion } from "framer-motion";
import { RefObject } from "react";
import { ChatPlusIcon } from "../../../public/svgs";
import Image from "next/image";

interface Page3Prop {
  sectionRefs: RefObject<HTMLElement[]>
}

const Page3: React.FC<Page3Prop> = ({
  sectionRefs
}) => {

  const INDEX = 2;

  return (
    <motion.section
      ref={(el) => {
        if (el) sectionRefs.current[INDEX] = el;
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0 * 0.1 }}
      className={`w-screen h-screen flex flex-col justify-center items-center gap-[40px]`}>
      <div className={`flex flex-col items-center gap-5 text-center`}>
        <div className={`flex gap-2.5 text-gray-50`}>
          <ChatPlusIcon className={`w-9`} />
          <p className={`text-display-32-b`}>채팅방 참여</p>
        </div>
        <p className={`text-headline-20-m text-gray-300`}>친구에게 받은 채팅 서버 ID를 입력하고 <br/> 채팅방에 참가하세요!</p>
      </div>
      <Image
        src={"/images/join_ex.webp"}
        alt="채팅방 참여"
        width={2000}
        height={2000}
        className={`w-[55%]`} />
    </motion.section>
  )
}

export default Page3;