import { MessageCircle, X } from "lucide-react";
import { useChatContext } from "../context/ChatContext";

// The "Ask" trigger button — fixed to the viewport so it stays in the same
// on-screen spot regardless of scroll position, and is available on every
// page (see App.tsx). Shares open/close state with ChatPanel via
// ChatContext. "Ask" sits directly in the middle of the message-bubble
// icon: the icon itself keeps spinning underneath, while the text on top
// stays perfectly still and readable, since it's a separate layer that
// isn't part of the rotating element.
export default function ChatTrigger({ className = "" }: { className?: string }) {
  const { open, setOpen } = useChatContext();

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`chat-orb relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-white shadow-2xl transition-transform hover:scale-105 ${className}`}
    >
      <span className="chat-orb-inner relative flex items-center justify-center">
        {open ? (
          <X size={38} strokeWidth={1.75} />
        ) : (
          <>
            <span className="spin-ccw inline-flex">
              <MessageCircle size={38} strokeWidth={1.5} />
            </span>
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center pb-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
              Ask
            </span>
          </>
        )}
      </span>
      {!open && (
        <span className="orbit-ring pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="flash-dot absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#10182b] bg-emerald-400" />
        </span>
      )}
    </button>
  );
}
