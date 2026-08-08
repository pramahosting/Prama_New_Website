import pg from "pg";

const { Pool } = pg;

let pool = null;

export function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for Neon
      max: 5,
      idleTimeoutMillis: 30_000,
    });
  }
  return pool;
}

const SCHEMA = `
create table if not exists leads (
  id serial primary key,
  name text not null,
  email text not null,
  company text,
  interest text,
  message text not null,
  source_page text,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id serial primary key,
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists chat_logs (
  id serial primary key,
  session_id text not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_chat_logs_session on chat_logs (session_id);
create index if not exists idx_leads_created_at on leads (created_at desc);
`;

export async function initSchema() {
  const p = getPool();
  if (!p) {
    console.warn("[db] DATABASE_URL not set — skipping schema init (running without persistence).");
    return;
  }
  try {
    await p.query(SCHEMA);
    console.log("[db] schema ready");
  } catch (err) {
    console.error("[db] schema init failed:", err.message);
  }
}
