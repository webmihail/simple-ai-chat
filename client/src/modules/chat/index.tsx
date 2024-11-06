import { FC } from "react";
import ChatMassagesField from "modules/chat/components/ChatMassagesField";
import ChatHistoryWindow from "modules/chat/components/ChatHistoryWindow";

import styles from "./chat.module.scss";
import useStreamMessages from "modules/chat/hooks/useStreamMessages.ts";

const Chat: FC = () => {
  const { isProcess, handleStopStream } = useStreamMessages();

  return (
    <div className={styles.container}>
      <ChatHistoryWindow />
      <ChatMassagesField
        isProcess={isProcess}
        handleStopStream={handleStopStream}
      />
    </div>
  );
};

export default Chat;
