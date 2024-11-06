import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { postStream } from "helpers/http.ts";
import { Role } from "modules/chat/enums";
import { useChatStore } from "modules/chat/store";

const useStreamMessages = () => {
  const { messages, addMessage, updateMessage } = useChatStore();

  useEffect(() => {
    const handleNewMessage = async () => {
      const lastMessage = messages[messages.length - 1];
      const isUserMessage = lastMessage.role === Role.User;

      if (lastMessage && isUserMessage) {
        const generatedID = uuidv4();
        addMessage({ id: generatedID, role: Role.Assistant, content: "" });

        try {
          let partialContent = "";
          const reader = await postStream("/chat", {
            messages: [
              { role: lastMessage.role, content: lastMessage.content },
            ],
          });

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const cleanedValue = value?.replace(/data:\s*/g, "");
              const chunk = cleanedValue?.split("\n").filter(Boolean);
              const parsedChunk = chunk
                .map((item: string) => JSON.parse(item).content)
                .join("");

              partialContent += parsedChunk;
              updateMessage(generatedID, partialContent);
            }
          }
        } catch (error) {
          console.error("Stream failed:", error);
          updateMessage(generatedID, "Response error");
        }
      }
    };

    if (messages.length > 0) {
      handleNewMessage()
        .then()
        .catch((error) => console.error("Error handling message:", error));
    }
  }, [addMessage, messages, updateMessage]);

  return { messages };
};

export default useStreamMessages;
