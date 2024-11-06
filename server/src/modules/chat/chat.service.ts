import { ChatGptClient } from "clients/openAiClient";
import { IMessage } from "./interfaces/message.interface";

export class ChatService {
  async getMessages(messages: IMessage[]) {
    return ChatGptClient.chat.completions.create({
      model: process.env.AI_MODEL as string,
      messages,
      stream: true,
    });
  }
}
