'use client'

import useModalStore from "@/store/useModalStore";
import Portal from "./Portal";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent } from "react";

const AlertModal = () => {

  const {
    isAlertModalOpen,
    alertModalText,
    setIsAlertModalOpen,
    setAlertModalText,
    setAlertModalFn,
    alertModalFn: fn,
  } = useModalStore();

  // 모달 창 내부 클릭 시 창 닫힘 방지
  const modalContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  }

  const modalClose = (e: MouseEvent) => {
    e.stopPropagation();
    setIsAlertModalOpen(false);
    setAlertModalText("")
    setAlertModalFn(() => {return null});
  }

  return (
    <Portal>
      <AnimatePresence>
        {isAlertModalOpen &&
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.3)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => modalClose(e)}
            >
            <div 
              onClick={(e) => modalContentClick(e)}
              className={`z-[9999] flex flex-col gap-2.5 items-center justify-between absolute px-10 py-5 bg-gray-600 rounded`}>
              <p className={`text-subhead-16-sb`}>{alertModalText}</p>
              <div className={`flex gap-2.5 text-subhead-14-sb`}>
                <button
                className={`cursor-pointer`}
                  onClick={fn}>넹</button>
                <button
                  onClick={(e) => modalClose(e)}>아뇨</button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </Portal>
  )

}

export default AlertModal;