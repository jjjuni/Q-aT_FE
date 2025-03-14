'use client'

import { useState } from "react"

export default function MessageInput() {

  const [message, setMessage] = useState('');

  return (
    <div className={`px-5 py-5 w-full`}>
      <input
        className={`w-full rounded-[16px] px-5 py-4 bg-gray-600 text-subhead-16-sb text-gray-50 placeholder:text-gray-500`}
        placeholder="메시지를 입력해주세요"
        value={message}
        onChange={(e) => {setMessage(e.target.value)}}/>
    </div>
  )
}
