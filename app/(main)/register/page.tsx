"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Simple logic CAPTCHA (better than checkbox)
    const captchaQuestion = "What is 6 + 4?";

    const passwordStrength =
        password.length === 0
            ? ""
            : password.length < 8
                ? "Password should be at least 8 characters"
                : "Password strength looks OK";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (captchaAnswer.trim() !== "10") {
            setError("CAPTCHA answer is incorrect.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: "student",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            setSuccess(true);
            setTimeout(() => router.push("/login"), 1500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-md mt-12 p-6 border rounded">
            <h1 className="text-2xl font-bold mb-4">Student Registration</h1>

            {success ? (
                <p className="text-green-600">
                    Account created successfully. Redirecting to login…
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    {passwordStrength && (
                        <p className="text-sm text-gray-700">{passwordStrength}</p>
                    )}

                    <div>
                        <label className="block text-sm mb-1">{captchaQuestion}</label>
                        <input
                            type="text"
                            placeholder="Your answer"
                            value={captchaAnswer}
                            onChange={(e) => setCaptchaAnswer(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>
            )}
        </div>
    );
}
