"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function StudentRegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "student" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Registration failed")
      router.push("/login")
    } catch (err: any) {
      setError(err?.message ?? "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-serif text-2xl font-bold">Student Registration</h1>
      <p className="mt-2 text-sm text-muted-foreground">Create an account to save jobs and apply.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="flex flex-col">
          <span className="text-sm">Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 rounded-md border px-3 py-2" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm">University email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 rounded-md border px-3 py-2" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm">Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 rounded-md border px-3 py-2" />
        </label>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div>
          <button type="submit" disabled={loading} className="rounded-md bg-secondary px-4 py-2 font-bold text-secondary-foreground">
            {loading ? "Creating..." : "Create student account"}
          </button>
        </div>
      </form>
    </div>
  )
}
