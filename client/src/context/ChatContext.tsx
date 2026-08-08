import { createContext, useContext, useState, type ReactNode } from "react";

type ChatContextValue = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <ChatContext.Provider value={{ open, setOpen }}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within a ChatProvider");
  return ctx;
}
