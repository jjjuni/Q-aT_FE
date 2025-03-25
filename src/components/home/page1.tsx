import { motion } from "framer-motion";
import { RefObject } from "react";
import { LeftArrowIcon, Logo } from "../../../public/svgs";

interface Page1Prop{
  sectionRefs: RefObject<HTMLElement[]>
}

const Page1:React.FC<Page1Prop> = ({
  sectionRefs
}) => {

  const INDEX = 0;

  return (
    <motion.section
      ref={(el) => {
        if (el) sectionRefs.current[INDEX] = el;
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0 * 0.1 }}
      className={`w-screen h-screen pt-[120px] pb-[40px] flex justify-center items-center`}>
      <div className={`flex flex-col items-center gap-5 text-display-32-b text-gray-300`}>
        <Logo className={`h-[80px]`} />
        <div className={`flex flex-col items-center`}>
          <p>쉽고 빠르게,</p>
          <p>어디서나 자유롭게,</p>
          <p>aT <span className={`text-white text-display-40-b`}>Q-aT</span></p>
        </div>
        <LeftArrowIcon className={`rotate-270 w-6 pt-5 cursor-pointer hover:text-gray-50 transition-all-300-out`} />
      </div>
    </motion.section>
  )
}

export default Page1;