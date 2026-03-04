import Link from "next/link";
import {
    ArrowLeft,
    MapPin,
    Clock,
    Building2,
    Wifi,
    GraduationCap,
    ExternalLink,
} from "lucide-react";
import { getJobById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) return notFound();

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <Link
                href="/jobs"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to jobs
            </Link>

            <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs">
                        {job.type}
                    </span>
                    {job.remote && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs">
                            <Wifi className="h-3 w-3" />
                            Remote/Hybrid
                        </span>
                    )}
                </div>

                <h1 className="mt-3 text-2xl font-bold">{job.title}</h1>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {job.company}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                    <div className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {job.campus} {job.location ? `- ${job.location}` : ""}
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Apply by{" "}
                        {job.deadline
                            ? new Date(job.deadline).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : "—"}
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Field: {job.fieldOfStudy}
                    </div>
                    <div className="font-medium">{job.salary}</div>
                </div>

                <div className="mt-6 space-y-3">
                    <h2 className="text-lg font-semibold">Description</h2>
                    <p className="whitespace-pre-line text-sm leading-6">
                        {job.description}
                    </p>
                </div>

                <div className="mt-6">
                    <Link
                        href={job.applyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
                    >
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                    <p className="mt-2 text-xs text-muted-foreground">
                        You will be redirected to the employer&apos;s application page.
                    </p>
                </div>
            </div>
        </div>
    );
}
