import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useChatContext } from "../context/ChatContext";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER: Msg = {
  role: "assistant",
  content:
    "Hi, I'm the Prama AI concierge. Ask me anything about Services, Solutions and Products of Prama AI.",
};

function sessionId() {
  const key = "prama_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

// The chat window itself. Always mounted (see App.tsx) so conversation state
// survives open/close toggles — visibility is driven by ChatContext, and the
// trigger button that toggles it can live anywhere (see ChatTrigger.tsx).
export default function ChatPanel() {
  const { open, setOpen } = useChatContext();
  const [messages, setMessages] = useState<Msg[]>([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, sessionId: sessionId() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Chat failed");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      // Log the real reason for debugging (missing/invalid GROQ_API_KEY,
      // network failure, etc.) — the chat bubble stays generic and friendly
      // for the visitor, but this makes the actual cause visible in the
      // browser console instead of being silently discarded.
      console.error("[chat] request failed:", err instanceof Error ? err.message : err);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I couldn't reach the concierge service just now — please try again, or use the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border hairline bg-ink-2 shadow-2xl">
      <div className="gradient-panel flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="chat-orb flex h-8 w-8 items-center justify-center">
            <span className="chat-orb-inner">
              <MessageCircle size={14} className="text-white" strokeWidth={2.25} />
            </span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-white">Prama AI Concierge</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-brass text-white"
                : "bg-ink text-paper border hairline"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="w-fit rounded-xl border hairline bg-ink px-3.5 py-2.5 text-sm text-slate-dim">
            thinking…
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t hairline p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about a service…"
          className="flex-1 rounded-full border hairline bg-ink px-4 py-2.5 text-sm text-paper outline-none placeholder:text-slate-dim/70 focus:border-teal"
        />
        <button
          onClick={send}
          disabled={loading}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass text-white transition-colors hover:bg-brass-light disabled:opacity-50"
        >
          <Send size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
