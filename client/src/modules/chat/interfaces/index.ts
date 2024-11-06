import { MessageStatus, Role } from "modules/chat/enums";

export interface IMessage {
  id: string;
  role: Role;
  content: string;
  status?: MessageStatus;
}

export interface IChatStore {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  updateMessage: (id: string, newContent: string) => void;
  abortMessage: () => void;
}

export interface IMessageItemProps {
  message: string;
}

export interface IChatMessageFieldProps {
  isProcess: boolean;
  handleStopStream: () => void;
}
