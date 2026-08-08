company_logo_tr.png is already in this folder — the real Prama AI logo,
matching what's live on www.prama-ai.com (transparent background, italic
"P" monogram + "rama AI" wordmark in brand blue). No action needed; Nav.tsx
and Footer.tsx already reference it directly.

If you ever need to replace it (a refreshed logo, etc.), just overwrite
this file with the new PNG using the same filename — no code changes
required.

Every other visual on the site (hero backgrounds, service tiles, product
cards, icons, the chat "orb" badge) is generated in code via CSS gradients
+ lucide-react icons — no other external image files are needed.

If this file is ever missing at build/runtime, the Nav and Footer degrade
gracefully to a styled text approximation rather than a broken image.
