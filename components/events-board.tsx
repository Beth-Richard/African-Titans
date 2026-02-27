"use client"

import { useState, useMemo } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getUpcomingEvents, type Event } from "@/lib/data"

const campuses = ["all", "Wolverhampton", "Telford", "Walsall"]
const categories = ["all", "Career", "Social", "Academic", "Sport", "Wellbeing"]

const categoryColors: Record<string, string> = {
  Career: "bg-blue-100 text-blue-700",
  Social: "bg-pink-100 text-pink-700",
  Academic: "bg-amber-100 text-amber-700",
  Sport: "bg-green-100 text-green-700",
  Wellbeing: "bg-purple-100 text-purple-700",
}

export function EventsBoard() {
  const allEvents = getUpcomingEvents()
  const [campus, setCampus] = useState("all")
  const [category, setCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = allEvents
    if (campus !== "all") result = result.filter((e) => e.campus === campus)
    if (category !== "all") result = result.filter((e) => e.category === category)
    return result
  }, [allEvents, campus, category])

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "event" : "events"} upcoming
        </p>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors",
            showFilters ? "border-secondary bg-secondary/10" : "hover:bg-muted"
          )}
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="mt-3 flex flex-wrap gap-4 rounded-lg border bg-card p-4">
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
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    category === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-lg border bg-card p-12 text-center">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 font-serif text-lg font-bold text-card-foreground">No events found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try different filters.</p>
          </div>
        ) : (
          filtered.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  const date = new Date(event.date)
  const day = date.toLocaleDateString("en-GB", { day: "numeric" })
  const month = date.toLocaleDateString("en-GB", { month: "short" })
  const spotsLeft = event.capacity - event.registered
  const almostFull = spotsLeft < event.capacity * 0.2

  return (
    <div className="rounded-lg border bg-card p-5 transition-colors hover:border-secondary">
      <div className="flex gap-4">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-primary text-primary-foreground">
          <span className="text-lg font-bold leading-none">{day}</span>
          <span className="text-xs uppercase">{month}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base font-bold text-card-foreground">{event.title}</h3>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                categoryColors[event.category] || "bg-muted text-muted-foreground"
              )}
            >
              {event.category}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{event.organizer}</p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {event.time}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {event.campus}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span className={almostFull ? "text-destructive font-medium" : ""}>
            {spotsLeft} spots left
          </span>
        </span>
      </div>

      <button className="mt-4 w-full rounded-md bg-primary py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Register
      </button>
    </div>
  )
}
