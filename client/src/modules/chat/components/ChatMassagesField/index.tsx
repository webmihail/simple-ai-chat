import { FC, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import SendBtnIcon from "assets/svg/arrow.svg?react";
import StopChatIcon from "assets/svg/stop.svg?react";
import { useChatStore } from "modules/chat/store";
import { Role } from "modules/chat/enums";
import { IChatMessageFieldProps } from "modules/chat/interfaces";

import styles from "./chatMessagesField.module.scss";

const ChatMassagesField: FC<IChatMessageFieldProps> = ({
  isProcess,
  handleStopStream,
}) => {
  const { addMessage } = useChatStore();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const generatedID = uuidv4();
    const eventTarget = event.target as HTMLFormElement;
    event.preventDefault();
    const formData = new FormData(eventTarget);
    const message = formData.get("message");

    if (message)
      addMessage({
        id: generatedID,
        role: Role.User,
        content: (message as string).trim(),
      });

    eventTarget.reset();
  };

  return (
    <form className={styles.textForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        className={styles.textField}
        placeholder="Type your message.."
      ></input>
      {isProcess ? (
        <button onClick={handleStopStream} className={styles.btn}>
          <StopChatIcon className={styles.btnIcon} />
        </button>
      ) : (
        <button type="submit" className={styles.btn}>
          <SendBtnIcon className={styles.btnIcon} />
        </button>
      )}
    </form>
  );
};

export default ChatMassagesField;
