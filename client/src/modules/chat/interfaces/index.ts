import { Role } from "modules/chat/enums";

export interface IMessage {
  id: string;
  role: Role;
  content: string;
}

export interface IChatStore {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  updateMessage: (id: string, newContent: string) => void;
}

export interface IMessageItemProps {
  message: string;
}
