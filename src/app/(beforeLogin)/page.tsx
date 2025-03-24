'use client'

import { useRouter } from "next/navigation";
import { GoogleIcon, KakaoIcon, NaverIcon } from "../../../public/svgs";
import Image from "next/image";

const LoginPage = () => {

  const router = useRouter();

  const login = async (provider: string) => {
    try {
      router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/authorization/${provider}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={`
        gap-8 w-screen h-[calc(100vh-90px)] px-[10%] flex flex-col items-center justify-center`}>
        <div className={`
          w-[165px] text-subhead-14-sb flex flex-col text-gray-300 gap-5
          md:w-[190px] md:text-subhead-16-sb
          lg:w-[235px] lg:text-headline-20-b`}>
          <Image
            width="1000"
            height="1000"
            src="/images/Q-aT.webp"
            alt="로고" />
          <p className={``}>로그인이 필요한 서비스입니다</p>
        </div>
        <div className={`
          w-[280px] text-subhead-14-sb flex flex-col gap-2.5 justify-center items-center
          md:w-[350px] md:text-subhead-16-sb
          lg:w-[420px] lg:text-headline-20-m`}>
          <div
            className={`
              h-[50px] flex gap-2 justify-center w-full text-center rounded-[12px] bg-[#FEE500] p-2 cursor-pointer
              md:h-[55px]
              lg:h-[60px]`}
            onClick={() => login("kakao")}>
            <KakaoIcon className={`w-[20px]`} />
            <p className={`text-center content-center text-[#000000]`}>카카오 로그인</p>
          </div>
          <div
            className={`
              h-[50px] flex gap-2 justify-center w-full text-center rounded-[12px] bg-[#03C75A] p-2 cursor-pointer
              md:h-[55px]
              lg:h-[60px]`}
            onClick={() => login("naver")}>
            <NaverIcon className={`w-[20px]`} />
            <p className={`text-center content-center text-white`}>네이버 로그인</p>
          </div>
          <div
            className={`
              h-[50px] flex gap-2 justify-center w-full text-center rounded-[12px] bg-gray-50 p-2 cursor-pointer
              md:h-[55px]
              lg:h-[60px]`}
            onClick={() => login("google")}>
            <GoogleIcon className={`w-[20px]`} />
            <p className={`text-center content-center text-[#000000]`}>구글 로그인</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;