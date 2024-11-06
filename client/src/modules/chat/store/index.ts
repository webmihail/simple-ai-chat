import { create } from "zustand";
import { IChatStore } from "modules/chat/interfaces";

export const useChatStore = create<IChatStore>((set) => ({
  messages: [],
  isStartingProcess: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateMessage: (id: string, newContent: string) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        return message.id === id
          ? { ...message, content: newContent }
          : message;
      }),
    })),
  setIsStartingProcess: (isStartingProcess: boolean) => {
    set(() => ({ isStartingProcess }));
  },
}));
