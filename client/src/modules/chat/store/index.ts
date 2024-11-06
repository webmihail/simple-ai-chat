import { create } from "zustand";
import { IChatStore } from "modules/chat/interfaces";
import { MessageStatus } from "modules/chat/enums";

export const useChatStore = create<IChatStore>((set) => ({
  messages: [],
  isStartingProcess: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, status: MessageStatus.Fulfilled },
      ],
    })),
  updateMessage: (id: string, newContent: string) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        return message.id === id
          ? { ...message, content: newContent }
          : message;
      }),
    })),
  abortMessage: () =>
    set((state) => ({
      messages: [
        ...state.messages.slice(0, -2),
        {
          ...state.messages[state.messages.length - 2],
          status: MessageStatus.Aborted,
        },
      ],
    })),
}));
