import OpenAI from "openai";

require("dotenv").config();

export const ChatGptClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
