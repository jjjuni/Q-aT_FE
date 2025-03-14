'use client'

import { useRouter } from "next/navigation";
import { KakaoIcon } from "../../public/svgs";

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
    <div className={`w-screen h-screen px-[10%] py-[100px] flex justify-center`}>
      <div className={`flex flex-col gap-5 w-[50%] justify-center items-center`}>
        <div
          className={` w-full rounded border border-solid border-gray-400 text-[20px] p-2 cursor-pointer`}
          onClick={() => login("kakao")}>
          <KakaoIcon/>
          카카오 로그인
        </div>
        <div
          className={`w-full rounded border border-solid border-gray-400 text-[20px] p-2 cursor-pointer`}
          onClick={() => login("naver")}>
          네이버 로그인
        </div>
        <div
          className={`w-full rounded border border-solid border-gray-400 text-[20px] p-2 cursor-pointer`}
          onClick={() => login("google")}>
          구글 로그인
        </div>
      </div>
    </div>
  )
}

export default LoginPage;