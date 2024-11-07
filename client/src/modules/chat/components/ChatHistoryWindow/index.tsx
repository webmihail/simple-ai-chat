import { FC, useEffect, useRef } from "react";

import MessageItem from "modules/chat/components/MessageItem";
import { useChatStore } from "modules/chat/store";

import styles from "./chatHistoryWindow.module.scss";

const ChatHistoryWindow: FC = () => {
  const { messages } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.container}>
      {messages?.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatHistoryWindow;
