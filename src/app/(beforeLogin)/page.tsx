'use client'

import { useEffect, useRef, useState } from "react";
import Page1 from "@/components/home/page1";
import HomePageTemplete from "@/components/home/Templete";
import { ChatOnIcon, ChatPlusIcon, MiniLogo } from "../../../public/svgs";

const MainPage = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  const sections = [
    <Page1 key={1} sectionRefs={sectionRefs} />,
    <HomePageTemplete
      key={2}
      index={1}
      icon={
        <ChatPlusIcon className={`w-9`} />}
      title={"채팅방 생성"}
      content_1={"원하는 이름의 채팅방을 생성하고"}
      content_2={"친구를 초대해 함께해요!"}
      imageUrl={"/images/create_ex.webp"}
      sectionRefs={sectionRefs} />,
    <HomePageTemplete
      key={3}
      index={2}
      icon={
        <ChatOnIcon className={`w-9`} />}
      title={"채팅방 참가"}
      content_1={"친구에게 받은 채팅서버 ID를 입력하고"}
      content_2={"채팅방에 참가하세요!"}
      imageUrl={"/images/join_ex.webp"}
      sectionRefs={sectionRefs} />,
    <HomePageTemplete
      key={4}
      index={3}
      icon={
        <MiniLogo className={`w-[93px]`} />}
      content_1={"쉽고 빠르게,"}
      content_2={"친구와 채팅을 시작해보세요!"}
      imageUrl={"/images/chat_ex.webp"}
      sectionRefs={sectionRefs} />,
  ]

  const scrollToSection = (index: number) => {
    if (!containerRef.current || !sectionRefs.current) return;

    isScrolling.current = true;

    const target = sectionRefs.current[index];
    const targetPosition = target.offsetTop;

    console.log(targetPosition)

    const startPosition = containerRef.current.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const duration = 1000;

    const scroll = (currentTime: number) => {
      if (!containerRef.current) return;

      if (startTime === null) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;  // 0~1로 진행되는 비율

      if (progress < 1) {
        const easeProgress = Math.pow(progress - 1, 3) + 1;   // ease-out 함수
        const scrollAmount = easeProgress * distance;         // 애니메이션 적용된 이동 거리
        containerRef.current.scrollTop = startPosition + scrollAmount;
        requestAnimationFrame(scroll);
      } else {
        containerRef.current.scrollTop = targetPosition;      // 마지막 위치로 정확하게 맞추기
        setCurrentIndex(index);                               // 스크롤 완료 후 인덱스 갱신
        isScrolling.current = false;                          // 스크롤 완료 상태로 변경
      }
    };

    requestAnimationFrame(scroll);  // 애니메이션 시작
  };

  const handleScroll = (e: WheelEvent) => {
    if (isScrolling.current) return;

    if (e.deltaY > 0 && currentIndex < sections.length - 1) {
      scrollToSection(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentIndex]);  // currentIndex 변경시, 리렌더링하도록 추가

  return (
    <div
      ref={containerRef}
      className={`w-screen h-screen overflow-hidden`}>
      {sections?.map((item) => (
        item
      ))}
    </div>
  );
}

export default MainPage;
