import MessageList from "@/components/chatroom/MessageList";
import MessageInput from "@/components/chatroom/MessageInput";
import Container from "@/components/common/Container";

export default function ChatRoom() {

  return (
    <Container className={`pb-2 flex flex-col justify-end`}>
      <MessageList />
      <MessageInput />
    </Container>
  );
}
