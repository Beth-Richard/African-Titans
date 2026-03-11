// FIX 1: Correct the client directive (removed the backslashs)
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState(""); // state for email
    const [password, setPassword] = useState(""); // state for password
    const [err, setErr] = useState<string | null>(null); // error message
    const [loading, setLoading] = useState(false); // loading state

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // sends login data
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setErr(data?.error ?? "Login failed");
                return;
            }

            // After login redirect user
            router.push("/profile");
            router.refresh();

        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center justify-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
                            <span className="font-serif text-xl font-bold">W</span>
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-semibold tracking-wide text-muted-foreground">
                                Student Campus Hub
                            </p>

                            <p className="text-xs text-muted-foreground/80">
                                University of Wolverhampton
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="rounded-2xl border bg-card/90 p-8 shadow-xl backdrop-blur-sm">

                    <h1 className="text-2xl font-serif font-bold text-card-foreground">
                        Welcome back
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Sign in with your campus account to access jobs and your saved opportunities.
                    </p>

                    <form onSubmit={submit} className="mt-6 space-y-4">

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-card-foreground">
                                Email
                            </label>

                            <input
                                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1"
                                placeholder="you@student.wlv.ac.uk"
                                type="email"
                                autoComplete="email"
                                value={email}

                                // FIX 2: Correct state update (previously used User.email which doesn't exist)
                                onChange={(e) => setEmail(e.target.value)}

                                required
                            />
                        </div>

                        <div className="space-y-1.5">

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-card-foreground">
                                    Password
                                </label>

                                <span className="text-xs text-muted-foreground">
                                    Campus login only
                                </span>
                            </div>

                            <input
                                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1"
                                placeholder="Enter your password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // correct password state update
                                required
                            />
                        </div>

                        {/* Display login error if present */}
                        {err && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                                {err}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Signing you in…" : "Sign in"}
                        </button>

                    </form>

                    <p className="mt-6 text-xs text-muted-foreground">
                        This is an MVP for the{" "}
                        <span className="font-medium text-card-foreground">
                            Student Campus Hub
                        </span>
                        . Use the test credentials provided by your team to log in.
                    </p>

                </div>
            </div>
        </main>
    );
}

// FIX 3: ensured component properly closes with }