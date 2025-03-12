"use client"; // 클라이언트 컴포넌트로 설정

import { Client } from "@stomp/stompjs"; // ✅ 브라우저 지원
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://192.168.50.186:8080/ws-chat"; // Spring WebSocket 엔드포인트

const Chat = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const params = useParams();

  const { roomId } = params;

  const messageDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sock = new SockJS(`${SOCKET_URL}`); // SockJS 연결
    const stompClient = new Client({
      webSocketFactory: () => sock,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe(`/topic/${roomId}`, (msg) => {
          setMessages((prev) => [...prev, JSON.parse(msg.body).content]); // 메시지 수신
        });
      },
      onDisconnect: () => console.log("Disconnected"),
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate(); // 안전한 연결 종료
    };
  }, [roomId]);

  const sendMessage = () => {
    if (client && message.trim() !== "") {
      client.publish({
        destination: `/app/sendMessage/${roomId}`,
        body: JSON.stringify({ content: message, sender: "User", roomId: roomId }),
      });
      setMessage(""); // 입력창 초기화
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작(새 줄 입력)을 막음
      sendMessage(); // Enter 키가 눌리면 메시지 전송
    }
  };

  useEffect(() => {
    if (messageDivRef.current)
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
  }, [messages])

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">SockJS Chat (STOMP 사용)</h2>
      <div 
        ref={messageDivRef}
        className="border p-4 h-64 overflow-auto mb-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="p-2">{msg}</div>
        ))}
      </div>
      <input
        className="border p-2 w-full mb-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
      />
      <button className="bg-blue-500 text-white p-2 w-full" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chat;