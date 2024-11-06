import { Request, Response } from "express";
import { ChatService } from "./chat.service";

export class ChatController {
  private readonly chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  async getMessages(req: Request, res: Response): Promise<void> {
    const { messages } = req.body;

    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await this.chatService.getMessages(messages);

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";

        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.end();
    } catch (error) {
      res.status(500).send("Process error");
    }
  }
}
