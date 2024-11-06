import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postStream } from "helpers/http.ts";
import { MessageStatus, Role } from "modules/chat/enums";
import { useChatStore } from "modules/chat/store";

const useStreamMessages = () => {
  const [isProcess, setIsProcess] = useState(false);
  const { messages, addMessage, updateMessage, abortMessage } = useChatStore();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const handleNewMessage = async () => {
      const lastMessage = messages[messages.length - 1];
      const isUserMessage = lastMessage.role === Role.User;
      const isAbortedMessage = lastMessage.status === MessageStatus.Aborted;

      if (lastMessage && isUserMessage && !isAbortedMessage) {
        const generatedID = uuidv4();
        addMessage({ id: generatedID, role: Role.Assistant, content: "" });
        setIsProcess(true);
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
          let partialContent = "";
          const reader = await postStream(
            "/chat",
            {
              messages: [
                { role: lastMessage.role, content: lastMessage.content },
              ],
            },
            { signal },
          );

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setIsProcess(false);
                break;
              }

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
          console.error("Stream failed", error);
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

  const handleStopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      abortMessage();
      setIsProcess(false);
    }
  }, [abortMessage]);

  return { isProcess, handleStopStream };
};

export default useStreamMessages;
