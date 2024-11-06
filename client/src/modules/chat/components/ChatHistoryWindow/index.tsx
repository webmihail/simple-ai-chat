import { FC } from "react";

import MessageItem from "modules/chat/components/MessageItem";
import useStreamMessages from "modules/chat/hooks/useStreamMessages.ts";

import styles from "./chatHistoryWindow.module.scss";

const ChatHistoryWindow: FC = () => {
  const { messages } = useStreamMessages();

  return (
    <div className={styles.container}>
      {messages?.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
    </div>
  );
};

export default ChatHistoryWindow;
