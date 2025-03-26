import { AnimatePresence, motion } from "framer-motion";
import { RefObject } from "react";
import { LeftArrowIcon, Logo } from "../../../public/svgs";

interface HeaderProp {
  isHeader: boolean;
  setIsHeader: (value: boolean) => void;
  setCurrentIndex: (value: number) => void;
  isScrolling: RefObject<boolean>
  sectionRefs: RefObject<HTMLElement[]>
}

const Header: React.FC<HeaderProp> = ({
  isHeader,
  setIsHeader,
  setCurrentIndex,
  isScrolling,
  sectionRefs
}) => {

  const INDEX = 0;

  return (
    <motion.section
      ref={(el) => {
        if (el) sectionRefs.current[INDEX] = el;
      }}
      initial={{ opacity: 1, }}
      animate={{ opacity: 1, }}
      transition={{ duration: 0.8, delay: 0 * 0.1 }}
      className={`
        ${isHeader ? `h-[60px] lg:h-[100px]` : `h-screen`}
        w-screen absolute flex justify-center items-center bg-gray-700 border-b border-solid border-gray-500 overflow-hidden transition-all-1000-custom`}>
      <div className={`
        text-headline-20-b flex flex-col items-center text-gray-300 
        md:text-display-24-b lg:text-display-32-b`}>
        <Logo className={`
          ${isHeader ? `h-[32px] lg:h-[48px]` : `h-[48px] mb-4 md:h-[60px] md:mb-6 lg:h-[80px] lg:mb-8`}
          transition-all-1000-custom`} />

        <AnimatePresence>
          {!isHeader &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.7, delay: 0 * 0.1 }}
              className={`flex flex-col items-center`}>
              <p className={`transition-all-1000-custom`}>쉽고 빠르게,</p>
              <p className={`transition-all-1000-custom`}>어디서나 자유롭게,</p>
              <p className={`transition-all-1000-custom`}>aT <span className={`text-white text-display-24-b md:text-display-28-b lg:text-display-40-b transition-all-1000-custom`}>Q-aT</span></p>
              <div className={`pt-3 md:pt-4 lg:pt-5 transition-all-1000-custom`}>
                <LeftArrowIcon
                  className={`
                    rotate-270 cursor-pointer hover:text-gray-50 transition-all-300-out
                    w-3 md:w-4 lg:w-6 `}
                  onClick={() => {
                    isScrolling.current = true
                    setIsHeader(true);
                    setCurrentIndex(1)
                    setTimeout(() => {
                      isScrolling.current = false
                    }, 1000);
                  }} />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default Header;