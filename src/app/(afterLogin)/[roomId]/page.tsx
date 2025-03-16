'use client'

import MessageList from "@/components/chatroom/MessageList";
import MessageInput from "@/components/chatroom/MessageInput";
import Container from "@/components/common/Container";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import useAuthStore from "@/store/useAuthStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axiosInstance";
import { useInView } from "react-intersection-observer";

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

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const getChats = async (pageParam: number) => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/chats/${roomId}?page=${pageParam}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const {
    data,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['chats', roomId],
    queryFn: ({ pageParam }) => getChats(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.result?.currentPage;
      const totalPage = lastPage?.result?.totalPage;
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
    retry: 0,
    enabled: !!roomId,
  });

  useEffect(() => {
    if (inView && !isPending && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isPending, hasNextPage]);

  // 웹 소켓 연결
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
    if (client && messageInputText.trim() !== "") {
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
      {isPending ? (
        <div>로딩중...</div>
      ) : (
        <MessageList
          prevMessageResponse={data}
          messages={messages}
          hasNextPage={hasNextPage}
          ref={ref} />
      )}

      <MessageInput messageInputText={messageInputText} setMessageInputText={setMessageInputText} sendMessage={sendMessage} />
    </Container>
  );
}
