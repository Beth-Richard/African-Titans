"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    User,
    Bookmark,
    FileText,
    Settings,
    Mail,
    ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/types";

type Tab = "saved" | "applications" | "settings";

type MeUser = {
    id: string;
    role: "student" | "company" | "admin";
    name: string;
    email: string;
};

export function StudentProfile() {
    const [activeTab, setActiveTab] = useState<Tab>("saved");
    const [me, setMe] = useState<MeUser | null>(null);

    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [loadingSaved, setLoadingSaved] = useState(true);

    // Load logged-in user
    useEffect(() => {
        fetch("/api/me", { cache: "no-store", credentials: "include" })
            .then((r) => r.json())
            .then((d) => setMe(d.user ?? null))
            .catch(() => setMe(null));
    }, []);

    // Reload saved jobs whenever Saved tab is opened
    useEffect(() => {
        if (activeTab !== "saved") return;

        setLoadingSaved(true);

        fetch("/api/profile/saved", { cache: "no-store", credentials: "include" })
            .then((r) => r.json())
            .then((d) => setSavedJobs(d.jobs ?? []))
            .catch(() => setSavedJobs([]))
            .finally(() => setLoadingSaved(false));
    }, [activeTab]);

    if (!me) {
        return (
            <div className="rounded-lg border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                    You must be logged in to view your profile.{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        );
    }

    const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
        { key: "saved", label: "Saved Jobs", icon: Bookmark },
        { key: "applications", label: "Applications", icon: FileText },
        { key: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div>
            {/* Profile Header */}
            <div className="rounded-lg border bg-card p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <User className="h-8 w-8" />
                    </div>

                    <div className="flex-1">
                        <h2 className="font-serif text-xl font-bold text-card-foreground">
                            {me.name}
                        </h2>

                        <div className="mt-2">
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                {me.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex gap-1 overflow-x-auto border-b">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                                activeTab === tab.key
                                    ? "border-secondary text-foreground"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6">
                {activeTab === "saved" && (
                    <>
                        {loadingSaved ? (
                            <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
                                Loading saved jobs...
                            </div>
                        ) : savedJobs.length === 0 ? (
                            <div className="rounded-lg border bg-card p-12 text-center">
                                <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/40" />
                                <p className="mt-3 font-serif text-lg font-bold text-card-foreground">
                                    No saved jobs
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Save jobs from the Jobs page to see them here.
                                </p>
                                <Link
                                    href="/jobs"
                                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                >
                                    Browse Jobs
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                {savedJobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition-colors hover:border-secondary"
                                    >
                                        <Link href={`/jobs/${job.id}`} className="flex-1">
                                            <h4 className="text-sm font-bold text-card-foreground">
                                                {job.title}
                                            </h4>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                {job.company} | {job.campus} | {job.salary}
                                            </p>
                                        </Link>

                                        <button
                                            onClick={async () => {
                                                const res = await fetch("/api/saved-jobs", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    credentials: "include",
                                                    body: JSON.stringify({ jobId: job.id, action: "unsave" }),
                                                });

                                                if (res.ok) {
                                                    setSavedJobs((prev) => prev.filter((j) => j.id !== job.id));
                                                }
                                            }}
                                            className="text-xs text-red-500 hover:underline"
                                        >
                                            Unsave
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === "applications" && (
                    <div className="rounded-lg border bg-card p-6">
                        Applications coming soon.
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="rounded-lg border bg-card p-6">
                        Settings coming soon.
                    </div>
                )}
            </div>
        </div>
    );
}