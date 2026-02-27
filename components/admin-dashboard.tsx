"use client"

import { useState } from "react"
import {
  Briefcase,
  Building2,
  Users,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  jobs as allJobs,
  accommodations as allAccommodations,
  events,
  currentAdmin,
  type Job,
  type Accommodation,
} from "@/lib/data"

type Tab = "overview" | "jobs" | "accommodation" | "users"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [jobList, setJobList] = useState(allJobs)
  const [accomList, setAccomList] = useState(allAccommodations)

  const pendingJobs = jobList.filter((j) => j.status === "pending")
  const approvedJobs = jobList.filter((j) => j.status === "approved")
  const pendingAccom = accomList.filter((a) => a.status === "pending")

  const approveJob = (id: string) => {
    setJobList((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "approved" as const } : j))
    )
  }

  const rejectJob = (id: string) => {
    setJobList((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "rejected" as const } : j))
    )
  }

  const approveAccom = (id: string) => {
    setAccomList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a))
    )
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "jobs", label: "Jobs", icon: Briefcase },
    { key: "accommodation", label: "Accommodation", icon: Building2 },
    { key: "users", label: "Users", icon: Users },
  ]

  return (
    <div>
      {/* Admin header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Logged in as {currentAdmin.name} ({currentAdmin.role.replace("_", " ")})
          </p>
        </div>
        {pendingJobs.length > 0 && (
          <div className="flex items-center gap-2 rounded-md bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
            <AlertTriangle className="h-4 w-4" />
            {pendingJobs.length} pending {pendingJobs.length === 1 ? "approval" : "approvals"}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b">
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
        {activeTab === "overview" && (
          <OverviewPanel
            totalJobs={jobList.length}
            approvedJobs={approvedJobs.length}
            pendingJobs={pendingJobs.length}
            totalAccom={accomList.length}
            totalEvents={events.length}
          />
        )}
        {activeTab === "jobs" && (
          <JobsPanel
            jobs={jobList}
            onApprove={approveJob}
            onReject={rejectJob}
          />
        )}
        {activeTab === "accommodation" && (
          <AccommodationPanel
            accommodations={accomList}
            onApprove={approveAccom}
          />
        )}
        {activeTab === "users" && <UsersPanel />}
      </div>
    </div>
  )
}

function OverviewPanel({
  totalJobs,
  approvedJobs,
  pendingJobs,
  totalAccom,
  totalEvents,
}: {
  totalJobs: number
  approvedJobs: number
  pendingJobs: number
  totalAccom: number
  totalEvents: number
}) {
  const stats = [
    { label: "Total Jobs", value: totalJobs, icon: Briefcase, color: "bg-blue-50 text-blue-700" },
    { label: "Approved", value: approvedJobs, icon: CheckCircle2, color: "bg-green-50 text-green-700" },
    { label: "Pending Review", value: pendingJobs, icon: Clock, color: "bg-amber-50 text-amber-700" },
    { label: "Accommodation", value: totalAccom, icon: Building2, color: "bg-purple-50 text-purple-700" },
    { label: "Events", value: totalEvents, icon: TrendingUp, color: "bg-teal-50 text-teal-700" },
    { label: "Students", value: "1,247", icon: Users, color: "bg-pink-50 text-pink-700" },
  ]

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-lg border bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className={cn("rounded-md p-2", stat.color)}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-card-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent activity */}
      <div className="mt-8 rounded-lg border bg-card p-5">
        <h3 className="font-serif text-lg font-bold text-card-foreground">Recent Activity</h3>
        <div className="mt-4 space-y-3">
          {[
            { action: "New job posted", detail: "Pharmacy Assistant - Boots UK", time: "2 hours ago", type: "pending" },
            { action: "Job approved", detail: "Graphic Design Freelancer - Creative Wolverhampton", time: "5 hours ago", type: "approved" },
            { action: "New job posted", detail: "Restaurant Server - Bilash Restaurant", time: "1 day ago", type: "pending" },
            { action: "Event created", detail: "Spring Career Fair 2026", time: "2 days ago", type: "approved" },
            { action: "Accommodation listed", detail: "2-Bed Flat - Walsall Centre", time: "3 days ago", type: "approved" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full",
                  activity.type === "pending" ? "bg-amber-500" : "bg-green-500"
                )}
              />
              <div className="flex-1">
                <span className="font-medium text-card-foreground">{activity.action}</span>
                <span className="text-muted-foreground"> - {activity.detail}</span>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JobsPanel({
  jobs,
  onApprove,
  onReject,
}: {
  jobs: Job[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter)

  return (
    <div>
      <div className="flex gap-1.5">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors capitalize",
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {filtered.map((job) => (
          <div key={job.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-bold text-card-foreground">{job.title}</h4>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    job.status === "approved" && "bg-green-100 text-green-700",
                    job.status === "pending" && "bg-amber-100 text-amber-700",
                    job.status === "rejected" && "bg-red-100 text-red-700"
                  )}
                >
                  {job.status}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {job.company} | {job.campus} | {job.type}
              </p>
            </div>
            {job.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => onApprove(job.id)}
                  className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve
                </button>
                <button
                  onClick={() => onReject(job.id)}
                  className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function AccommodationPanel({
  accommodations,
  onApprove,
}: {
  accommodations: Accommodation[]
  onApprove: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      {accommodations.map((acc) => (
        <div key={acc.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold text-card-foreground">{acc.title}</h4>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  acc.status === "approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                )}
              >
                {acc.status}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {acc.type} | {acc.campus} | {acc.price}
            </p>
          </div>
          {acc.status === "pending" && (
            <button
              onClick={() => onApprove(acc.id)}
              className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function UsersPanel() {
  const dummyUsers = [
    { name: "Alex Johnson", email: "a.johnson@student.wlv.ac.uk", role: "Student", campus: "Wolverhampton", status: "active" },
    { name: "Priya Patel", email: "p.patel@student.wlv.ac.uk", role: "Student", campus: "Wolverhampton", status: "active" },
    { name: "James Williams", email: "j.williams@student.wlv.ac.uk", role: "Student", campus: "Telford", status: "active" },
    { name: "Aisha Mohammed", email: "a.mohammed@student.wlv.ac.uk", role: "Student", campus: "Walsall", status: "active" },
    { name: "Tom Carter", email: "t.carter@student.wlv.ac.uk", role: "Student", campus: "Wolverhampton", status: "inactive" },
    { name: "Campus Brews Ltd", email: "hr@campusbrews.co.uk", role: "Employer", campus: "-", status: "active" },
    { name: "Dr. Sarah Mitchell", email: "s.mitchell@wlv.ac.uk", role: "Admin", campus: "-", status: "active" },
  ]

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Campus</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-3 font-medium text-card-foreground">{user.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    user.role === "Admin" && "bg-purple-100 text-purple-700",
                    user.role === "Student" && "bg-blue-100 text-blue-700",
                    user.role === "Employer" && "bg-green-100 text-green-700"
                  )}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{user.campus}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    user.status === "active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  )}
                >
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
