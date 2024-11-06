import { Role } from "@modules/chat/enums/roles.enum";

export interface IMessage {
  role: Role;
  content: string;
  name: string;
}
