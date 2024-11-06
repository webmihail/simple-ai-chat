import { FC } from "react";
import { IMessage, IMessageItemProps } from "modules/chat/interfaces";

import UserIcon from "assets/svg/user.svg?react";
import AssistantIcon from "assets/svg/assistant.svg?react";

import styles from "./messageItem.module.scss";
import { Role } from "modules/chat/enums";

const UserMessage: FC<IMessageItemProps> = ({ message }) => {
  return (
    <div className={styles.messageUserContainer}>
      <div className={styles.messageItemUser}>{message}</div>
      <UserIcon />
    </div>
  );
};

const AssistantMessage: FC<IMessageItemProps> = ({ message }) => {
  return (
    <div className={styles.messageAssistantContainer}>
      <AssistantIcon />
      <div className={styles.messageItemAssistant}>
        {message ? message : "Processing..."}
      </div>
    </div>
  );
};

const MessageItem: FC<IMessage> = (props) => {
  const { role, content } = props || {};
  return role === Role.User ? (
    <UserMessage message={content} />
  ) : (
    <AssistantMessage message={content} />
  );
};

export default MessageItem;
