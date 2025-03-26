import { motion } from "framer-motion";
import { ReactNode, RefObject } from "react";
import Image from "next/image";

interface HomePageTempleteProps {
  index: number;
  icon: ReactNode;
  title?: string;
  content_1: string;
  content_2?: string;

  imageUrl: string;

  sectionRefs: RefObject<HTMLElement[]>
}

const HomePageTemplete: React.FC<HomePageTempleteProps> = ({
  index,
  icon,
  title,
  content_1,
  content_2,

  imageUrl,

  sectionRefs,
}) => {

  const INDEX = index;

  return (
    <motion.section
      ref={(el) => {
        if (el) sectionRefs.current[INDEX] = el;
      }}
      transition={{ duration: 0.8, delay: 0 * 0.1 }}
      className={`w-screen h-screen flex flex-col justify-center items-center gap-[40px]`}>
      <div className={`flex flex-col items-center gap-5 text-center`}>
        <div className={`flex gap-1.5 md:gap-2.5 text-gray-50 items-center`}>
          <div className={`h-6 md:h-8 lg:h-10 transition-all-300-out`}>
            {icon}
          </div>
          {title && <p className={`
            text-headline-20-b transition-all-300-out
            md:text-display-24-b
            lg:text-display-32-b`}>{title}</p>}
        </div>
        <p className={`text-caption-12-r md:text-body-14-r lg:text-body-16-r text-gray-300 transition-all-300-out`}>
          {content_1}
          {content_2 != null &&
            <>
              <br />
              {content_2}
            </>}
        </p>
      </div>
      <Image
        src={imageUrl}
        alt="채팅방 생성"
        width={2000}
        height={2000}
        className={`w-[80%] md:w-[70%] lg:w-[55%] transition-all-300-out`} />
    </motion.section>
  )
}

export default HomePageTemplete;