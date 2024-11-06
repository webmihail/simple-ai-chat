import { Router } from "express";
import { ChatController } from "./chat.controller";

const router = Router();
const chatController = new ChatController();

router.post("/chat", chatController.getMessages.bind(chatController));

export default router;
