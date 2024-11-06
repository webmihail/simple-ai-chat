import {FC} from "react";
import ChatMassagesField from "modules/chat/components/ChatMassagesField";
import ChatHistoryWindow from "modules/chat/components/ChatHistoryWindow";

import styles from './chat.module.scss';

const Chat: FC = () => {
  return <div className={styles.container}>
    <ChatHistoryWindow />
    <ChatMassagesField />
  </div>
};

export default Chat;
