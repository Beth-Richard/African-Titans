"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErr(data?.error ?? "Login failed");
        return;
      }

      router.push("/jobs");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-md py-10">
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          className="h-10 w-full rounded-md border px-3 text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="h-10 w-full rounded-md border px-3 text-sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          disabled={loading}
          className="h-10 w-full rounded-md bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-70"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </main>
  );
}