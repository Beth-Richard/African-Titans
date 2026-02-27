import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Building2,
  Wifi,
  GraduationCap,
  ExternalLink,
} from "lucide-react"
import { getJobById, getApprovedJobs } from "@/lib/data"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return getApprovedJobs().map((job) => ({ id: job.id }))
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = getJobById(id)

  if (!job) return notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </Link>

      <div className="mt-6 rounded-lg border bg-card p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
            {job.type}
          </span>
          {job.remote && (
            <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              <Wifi className="h-3 w-3" />
              Remote
            </span>
          )}
        </div>

        <h1 className="mt-3 font-serif text-2xl font-bold text-card-foreground lg:text-3xl">
          {job.title}
        </h1>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0" />
            {job.company}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            {job.campus} - {job.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 shrink-0" />
            {job.salary}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            Apply by{" "}
            {new Date(job.deadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4 shrink-0" />
            Field: {job.fieldOfStudy}
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h2 className="font-serif text-lg font-bold text-card-foreground">Description</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.description}</p>
        </div>

        <div className="mt-6 border-t pt-6">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-2.5 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
          >
            Apply Now
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="mt-2 text-xs text-muted-foreground">
            You will be redirected to the employer&apos;s application page.
          </p>
        </div>
      </div>
    </div>
  )
}
