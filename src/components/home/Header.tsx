import { AnimatePresence, motion } from "framer-motion";
import { RefObject } from "react";
import { LeftArrowIcon, Logo } from "../../../public/svgs";

interface HeaderProp {
  isHeader: boolean;
  sectionRefs: RefObject<HTMLElement[]>
}

const Header: React.FC<HeaderProp> = ({
  isHeader,
  sectionRefs
}) => {

  const INDEX = 0;

  return (
    <motion.section
      ref={(el) => {
        if (el) sectionRefs.current[INDEX] = el;
      }}
      initial={{ opacity: 1, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0 * 0.1 }}
      className={`
        ${isHeader ? `h-[100px]` : `h-screen`}
        w-screen absolute flex justify-center items-center bg-gray-700 border-b border-solid border-gray-500 overflow-hidden transition-all-1000-custom`}>
      <div className={`flex flex-col items-center text-gray-300 text-display-32-b`}>
        <Logo className={`
          ${isHeader ? `h-[48px]` : `h-[80px] mb-8`}
          transition-all-1000-custom`} />

        <AnimatePresence>
          {!isHeader &&
            <motion.div
              initial={{ opacity: 0, y: 16, height: 0 }}
              exit={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.7, delay: 0 * 0.1 }}
              className={`flex flex-col items-center`}>
              <p className={`transition-all-1000-custom`}>쉽고 빠르게,</p>
              <p className={`transition-all-1000-custom`}>어디서나 자유롭게,</p>
              <p className={`transition-all-1000-custom`}>aT <span className={`text-white`}>Q-aT</span></p>
              <div className={`pt-5`}>
                <LeftArrowIcon className={`rotate-270 w-6 cursor-pointer hover:text-gray-50 transition-all-300-out`} />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default Header;