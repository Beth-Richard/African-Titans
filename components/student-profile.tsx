"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Bookmark,
  FileText,
  Settings,
  MapPin,
  GraduationCap,
  Mail,
  Calendar,
  Briefcase,
  Clock,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { currentStudent, getJobById } from "@/lib/data"

type Tab = "saved" | "applications" | "settings"

export function StudentProfile() {
  const [activeTab, setActiveTab] = useState<Tab>("saved")
  const student = currentStudent

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "saved", label: "Saved Jobs", icon: Bookmark },
    { key: "applications", label: "Applications", icon: FileText },
    { key: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div>
      {/* Profile header */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-xl font-bold text-card-foreground">{student.name}</h2>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                {student.email}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" />
                {student.course}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {student.campus} Campus
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Year {student.yearOfStudy}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 overflow-x-auto border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon
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
          )
        })}
      </div>

      <div className="mt-6">
        {activeTab === "saved" && <SavedJobsTab savedIds={student.savedJobs} />}
        {activeTab === "applications" && <ApplicationsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  )
}

function SavedJobsTab({ savedIds }: { savedIds: string[] }) {
  const savedJobs = savedIds.map(getJobById).filter(Boolean)

  if (savedJobs.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 font-serif text-lg font-bold text-card-foreground">No saved jobs</p>
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
    )
  }

  return (
    <div className="space-y-3">
      {savedJobs.map((job) => {
        if (!job) return null
        return (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition-colors hover:border-secondary"
          >
            <div>
              <h4 className="text-sm font-bold text-card-foreground">{job.title}</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {job.company} | {job.campus} | {job.salary}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-primary">
                {job.type}
              </span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function ApplicationsTab() {
  const applications = currentStudent.applications

  const statusColors: Record<string, string> = {
    applied: "bg-blue-100 text-blue-700",
    reviewing: "bg-amber-100 text-amber-700",
    interview: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    accepted: "bg-green-100 text-green-700",
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => {
        const job = getJobById(app.jobId)
        return (
          <div key={app.id} className="rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-card-foreground">{job?.title || "Unknown Job"}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">{job?.company}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                  statusColors[app.status] || "bg-muted text-muted-foreground"
                )}
              >
                {app.status}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Applied on {new Date(app.dateApplied).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="font-serif text-lg font-bold text-card-foreground">Profile Settings</h3>
      <p className="mt-1 text-sm text-muted-foreground">Update your personal information and preferences.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Full Name</label>
          <input
            type="text"
            defaultValue={currentStudent.name}
            className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Email</label>
          <input
            type="email"
            defaultValue={currentStudent.email}
            disabled
            className="mt-1.5 h-10 w-full rounded-md border bg-muted px-3 text-sm text-muted-foreground"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Course</label>
          <input
            type="text"
            defaultValue={currentStudent.course}
            className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Year of Study</label>
          <select
            defaultValue={currentStudent.yearOfStudy}
            className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value={1}>Year 1</option>
            <option value={2}>Year 2</option>
            <option value={3}>Year 3</option>
            <option value={4}>Year 4</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Campus</label>
          <select
            defaultValue={currentStudent.campus}
            className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option>Wolverhampton</option>
            <option>Telford</option>
            <option>Walsall</option>
          </select>
        </div>
      </div>

      <button className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Save Changes
      </button>
    </div>
  )
}
