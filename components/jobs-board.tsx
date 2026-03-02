"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Wifi,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getApprovedJobs, type Job } from "@/lib/data"

const campuses = ["all", "Wolverhampton", "Telford", "Walsall"]
const jobTypes = ["all", "Part-time", "Full-time", "Seasonal", "Internship"]

export function JobsBoard() {
  const allJobs = getApprovedJobs()
  const [query, setQuery] = useState("")
  const [campus, setCampus] = useState("all")
  const [type, setType] = useState("all")
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set(["j2", "j3", "j8"]))
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = allJobs
    if (campus !== "all") result = result.filter((j) => j.campus === campus)
    if (type !== "all") result = result.filter((j) => j.type === type)
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.fieldOfStudy.toLowerCase().includes(q)
      )
    }
    return result
  }, [allJobs, query, campus, type])

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      {/* Search */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or field..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-4 border-t pt-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Campus</label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {campuses.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCampus(c)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      campus === c
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {c === "all" ? "All Campuses" : c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Job Type</label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {jobTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      type === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {t === "all" ? "All Types" : t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "job" : "jobs"} found
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 font-serif text-lg font-bold text-card-foreground">No jobs found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={savedJobs.has(job.id)}
              onToggleSave={() => toggleSave(job.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function JobCard({
  job,
  saved,
  onToggleSave,
}: {
  job: Job
  saved: boolean
  onToggleSave: () => void
}) {
  return (
    <div className="group rounded-lg border bg-card p-5 transition-colors hover:border-secondary">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/jobs/${job.id}`}
              className="font-serif text-base font-bold text-card-foreground hover:text-primary"
            >
              {job.title}
            </Link>
            <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-primary">
              {job.type}
            </span>
            {job.remote && (
              <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                <Wifi className="h-3 w-3" />
                Remote
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
        </div>
        <button
          onClick={onToggleSave}
          className="shrink-0 rounded-md p-2 transition-colors hover:bg-muted"
          aria-label={saved ? "Unsave job" : "Save job"}
        >
          {saved ? (
            <BookmarkCheck className="h-5 w-5 text-secondary" />
          ) : (
            <Bookmark className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {job.description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {job.campus} - {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Apply by {new Date(job.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
        </span>
        <span className="font-medium text-primary">{job.salary}</span>
      </div>
    </div>
  )
}
