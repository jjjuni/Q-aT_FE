'use client'

import MessageList from "@/components/chatroom/MessageList";
import MessageInput from "@/components/chatroom/MessageInput";
import Container from "@/components/common/Container";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import useAuthStore from "@/store/useAuthStore";

interface ChatContent {
  sender: string;
  message: string;
  email: string;
  sendAt: string;
}

export default function ChatRoom() {

  const {
    name,
    email,
  } = useAuthStore();

  const [messageInputText, setMessageInputText] = useState('');

  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatContent[]>([]);
  const { roomId } = useParams();

  useEffect(() => {
    const sock = new SockJS(`${process.env.NEXT_PUBLIC_SOCKET_URL}`); // SockJS 연결
    const stompClient = new Client({
      webSocketFactory: () => sock,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe(`/topic/${roomId}`, (msg) => {

          const ChatContent = JSON.parse(msg.body)

          setMessages((prev) => [...prev, ChatContent]); // 메시지 수신
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
    if (client && "message".trim() !== "") {
      console.log(email)
      client.publish({
        destination: `/app/sendMessage/${roomId}`,
        body: JSON.stringify({ message: messageInputText, sender: name, email, roomId }),
      });
      setMessageInputText(""); // 입력창 초기화
    }
  };

  return (
    <Container className={`pb-2 flex flex-col justify-end`}>
      <MessageList messages={messages}/>
      <MessageInput messageInputText={messageInputText} setMessageInputText={setMessageInputText} sendMessage={sendMessage}/>
    </Container>
  );
}
