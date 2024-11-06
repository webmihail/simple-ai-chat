import { FC } from "react";

import MessageItem from "modules/chat/components/MessageItem";
import { useChatStore } from "modules/chat/store";

import styles from "./chatHistoryWindow.module.scss";

const ChatHistoryWindow: FC = () => {
  const { messages } = useChatStore();

  return (
    <div className={styles.container}>
      {messages?.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
    </div>
  );
};

export default ChatHistoryWindow;
