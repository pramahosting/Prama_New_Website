import { useEffect, useRef, useState } from "react";
import { MessageCircle, Sparkles, X, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER: Msg = {
  role: "assistant",
  content:
    "Hi, I'm the Prama AI concierge. Ask me about AI solutions, data solutions, generative AI & RAG, cloud & FinOps, smart websites, or any product in our portfolio — AccFino, TalentIQ or MindKaar.",
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

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
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
    } catch {
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

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border hairline bg-ink-2 shadow-2xl">
          <div className="gradient-panel flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <Sparkles size={14} className="text-white" strokeWidth={2} />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-white">Prama Concierge</span>
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
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="gradient-panel flex items-center gap-2.5 rounded-full py-3.5 pl-4 pr-5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-2xl transition-transform hover:scale-105"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          {open ? <X size={14} strokeWidth={2.25} /> : <MessageCircle size={14} strokeWidth={2.25} />}
        </span>
        {open ? "Close" : "Ask Prama AI"}
        {!open && <span className="flash-dot h-1.5 w-1.5 rounded-full bg-white" />}
      </button>
    </div>
  );
}
