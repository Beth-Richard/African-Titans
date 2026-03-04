"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Clock, Bookmark, BookmarkCheck, Wifi, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/types";

const campuses = ["all", "Wolverhampton", "Telford", "Walsall"] as const;
const jobTypes = ["all", "Part-time", "Full-time", "Seasonal", "Internship"] as const;

export function JobsBoard() {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [campus, setCampus] = useState<(typeof campuses)[number]>("all");
    const [type, setType] = useState<(typeof jobTypes)[number]>("all");

    const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
    const [showFilters, setShowFilters] = useState(false);

    // Load saved jobs once (for logged in user)
    useEffect(() => {
        fetch("/api/saved-jobs", { cache: "no-store", credentials: "include" })
            .then((r) => r.json())
            .then((d) => {
                if (Array.isArray(d.savedJobIds)) setSavedJobs(new Set(d.savedJobIds));
            })
            .catch(() => setSavedJobs(new Set()));
    }, []);

    // Fetch jobs when filters change
    useEffect(() => {
        let cancelled = false;

        async function run() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (query.trim()) params.set("q", query.trim());
                if (campus !== "all") params.set("campus", campus);
                if (type !== "all") params.set("type", type);

                const res = await fetch(`/api/jobs?${params.toString()}`, { cache: "no-store" });
                const data = await res.json();
                if (!cancelled) setAllJobs(Array.isArray(data.jobs) ? data.jobs : []);
            } catch {
                if (!cancelled) setAllJobs([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [query, campus, type]);

    const filtered = useMemo(() => allJobs, [allJobs]);

    const toggleSave = async (id: string) => {
        const isSaved = savedJobs.has(id);

        // optimistic UI update
        setSavedJobs((prev) => {
            const next = new Set(prev);
            if (isSaved) next.delete(id);
            else next.add(id);
            return next;
        });

        try {
            const res = await fetch("/api/saved-jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ jobId: id, action: isSaved ? "unsave" : "save" }),
            });

            if (!res.ok) {
                // revert
                setSavedJobs((prev) => {
                    const next = new Set(prev);
                    if (isSaved) next.add(id);
                    else next.delete(id);
                    return next;
                });
                return;
            }

            const data = await res.json();
            if (Array.isArray(data.savedJobIds)) {
                setSavedJobs(new Set(data.savedJobIds));
            }
        } catch {
            // revert on network error
            setSavedJobs((prev) => {
                const next = new Set(prev);
                if (isSaved) next.add(id);
                else next.delete(id);
                return next;
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search jobs, companies, categories..."
                        className="h-10 w-full rounded-md border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                        "flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors",
                        showFilters ? "border-secondary bg-secondary/10 text-secondary-foreground" : "hover:bg-muted"
                    )}
                >
                    <Filter className="h-4 w-4" />
                    Filters
                </button>
            </div>

            {showFilters && (
                <div className="rounded-lg border bg-card p-4 space-y-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold">Campus</p>
                        <div className="flex flex-wrap gap-2">
                            {campuses.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCampus(c)}
                                    className={cn(
                                        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                                        campus === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    )}
                                >
                                    {c === "all" ? "All Campuses" : c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-semibold">Job Type</p>
                        <div className="flex flex-wrap gap-2">
                            {jobTypes.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={cn(
                                        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                                        type === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    )}
                                >
                                    {t === "all" ? "All Types" : t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                    {loading ? "Loading..." : `${filtered.length} ${filtered.length === 1 ? "job" : "jobs"} found`}
                </span>
            </div>

            {loading ? (
                <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
                    Fetching jobs from database...
                </div>
            ) : filtered.length === 0 ? (
                <div className="rounded-lg border bg-card p-6 text-center">
                    <h3 className="text-lg font-semibold">No jobs found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            saved={savedJobs.has(job.id)}
                            onToggleSave={() => toggleSave(job.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function JobCard({
    job,
    saved,
    onToggleSave,
}: {
    job: Job;
    saved: boolean;
    onToggleSave: () => void;
}) {
    const deadlineLabel = job.deadline
        ? new Date(job.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
        : "—";

    return (
        <div className="rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/jobs/${job.id}`} className="text-base font-semibold hover:underline">
                            {job.title}
                        </Link>
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{job.type}</span>
                        {job.remote && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs">
                                <Wifi className="h-3 w-3" />
                                Remote/Hybrid
                            </span>
                        )}
                    </div>

                    <div className="mt-1 text-sm text-muted-foreground">{job.company}</div>

                    <div className="mt-3 line-clamp-2 text-sm">{job.description}</div>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.campus} {job.location ? `- ${job.location}` : ""}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Apply by {deadlineLabel}
                        </span>
                        <span>{job.salary}</span>
                    </div>
                </div>

                <button
                    onClick={onToggleSave}
                    aria-label={saved ? "Unsave job" : "Save job"}
                    className="rounded-md border p-2 hover:bg-muted"
                >
                    {saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
}