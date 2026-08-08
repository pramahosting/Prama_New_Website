import { MessageCircle, X } from "lucide-react";
import { useChatContext } from "../context/ChatContext";

// The "Ask Prama AI" trigger button — fixed to the viewport so it stays in
// the same on-screen spot regardless of scroll position, and is available
// on every page (see App.tsx). Shares open/close state with ChatPanel via
// ChatContext.
export default function ChatTrigger({ className = "" }: { className?: string }) {
  const { open, setOpen } = useChatContext();

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-[#10182b] px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-2xl transition-transform hover:scale-105 ${className}`}
    >
      <span className="chat-orb relative flex h-9 w-9 items-center justify-center">
        <span className="chat-orb-inner">
          {open ? <X size={16} strokeWidth={2.25} /> : <MessageCircle size={16} strokeWidth={2.25} />}
        </span>
        {!open && (
          <span className="flash-dot absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#10182b] bg-emerald-400" />
        )}
      </span>
      {open ? "Close" : "Ask Prama AI"}
    </button>
  );
}
