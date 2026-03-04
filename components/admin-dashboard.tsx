
"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle, Clock, Briefcase, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/types";

type StatusFilter = "pending" | "approved" | "rejected";

export function AdminDashboard() {
    const [status, setStatus] = useState<StatusFilter>("pending");
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/jobs?status=${status}`, { cache: "no-store" });
            const data = await res.json();
            setJobs(Array.isArray(data.jobs) ? data.jobs : []);
        } catch (e) {
            setError("Failed to load jobs.");
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    const counts = useMemo(() => {
        const pending = status === "pending" ? jobs.length : undefined;
        return { pending };
    }, [jobs.length, status]);

    async function moderate(jobId: string, decision: "approved" | "rejected") {
        // optimistic UI: remove job from list
        setJobs((prev) => prev.filter((j) => j.id !== jobId));

        try {
            await fetch("/api/admin/jobs/moderate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobId, decision }),
            });
        } catch {
            // rollback by reloading (simple)
            load();
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <h1 className="text-xl font-bold">Admin • Jobs Moderation</h1>
                </div>

                <button
                    onClick={load}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setStatus("pending")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                        status === "pending" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    )}
                >
                    <Clock className="h-4 w-4" />
                    Pending
                </button>

                <button
                    onClick={() => setStatus("approved")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                        status === "approved" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    )}
                >
                    <CheckCircle2 className="h-4 w-4" />
                    Approved
                </button>

                <button
                    onClick={() => setStatus("rejected")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                        status === "rejected" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    )}
                >
                    <XCircle className="h-4 w-4" />
                    Rejected
                </button>
            </div>

            <div className="rounded-lg border bg-card p-4">
                {loading ? (
                    <p className="text-sm text-muted-foreground">Loading jobs…</p>
                ) : error ? (
                    <p className="text-sm text-red-600">{error}</p>
                ) : jobs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No jobs in this status.</p>
                ) : (
                    <div className="space-y-3">
                        {jobs.map((job) => (
                            <div key={job.id} className="rounded-md border p-3">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold">{job.title}</div>
                                        <div className="mt-0.5 text-xs text-muted-foreground">
                                            {job.company} • {job.campus} • {job.type} • {job.salary}
                                        </div>
                                        <div className="mt-2 line-clamp-2 text-xs">{job.description}</div>
                                    </div>

                                    {status === "pending" ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => moderate(job.id, "approved")}
                                                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:opacity-95"
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => moderate(job.id, "rejected")}
                                                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:opacity-95"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                                            {status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
