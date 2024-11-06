import express, { Application } from "express";
import OpenAI from "openai";
import cors from "cors";

import chatRouter from "modules/chat/chat.routes";

require("dotenv").config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", chatRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
