'use client'

import { useRouter } from "next/navigation";
import { GoogleIcon, KakaoIcon, NaverIcon } from "../../public/svgs";

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
      <div className={`sticky top-0 w-screen h-[90px] border-b border-solid border-gray-600`}>

      </div>
      <div className={`w-screen h-[calc(100vh-90px)] px-[10%] flex justify-center`}>
        <div className={`w-[420px] flex flex-col gap-5 justify-center items-center`}>
          <div
            className={`flex gap-2 justify-center w-full h-[60px] text-center rounded-[12px] bg-[#FEE500] text-[20px] p-2 cursor-pointer`}
            onClick={() => login("kakao")}>
            <KakaoIcon className={`w-[20px]`} />
            <p className={`text-center content-center text-[#000000]`}>카카오 로그인</p>
          </div>
          <div
            className={`flex gap-2 justify-center w-full h-[60px] text-center rounded-[12px] bg-[#03C75A] text-[20px] p-2 cursor-pointer`}
            onClick={() => login("naver")}>
            <NaverIcon className={`w-[20px]`} />
            <p className={`text-center content-center text-[#000000]`}>네이버 로그인</p>
          </div>
          <div
            className={`flex gap-2 justify-center w-full h-[60px] text-center rounded-[12px] bg-gray-50 text-[20px] p-2 cursor-pointer`}
            onClick={() => login("google")}>
            <GoogleIcon className={`w-[20px]`} />
            <p className={`text-center content-center text-[#000000]`}>카카오 로그인</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;