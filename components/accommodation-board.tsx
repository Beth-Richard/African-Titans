"use client"

import { useState, useMemo } from "react"
import {
  Search,
  MapPin,
  Bed,
  Wifi,
  Car,
  Dumbbell,
  ShieldCheck,
  Building2,
  Filter,
  Mail,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getApprovedAccommodations, type Accommodation } from "@/lib/data"

const campuses = ["all", "Wolverhampton", "Telford", "Walsall"]
const types = ["all", "Student Hall", "Private Rental", "Shared House", "Studio"]

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Parking: Car,
  Gym: Dumbbell,
  "24hr Security": ShieldCheck,
}

export function AccommodationBoard() {
  const allAccom = getApprovedAccommodations()
  const [query, setQuery] = useState("")
  const [campus, setCampus] = useState("all")
  const [type, setType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = allAccom
    if (campus !== "all") result = result.filter((a) => a.campus === campus)
    if (type !== "all") result = result.filter((a) => a.type === type)
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q)
      )
    }
    return result
  }, [allAccom, query, campus, type])

  return (
    <div>
      {/* Search */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search accommodation by name or location..."
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
              <label className="text-xs font-medium text-muted-foreground">Type</label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {types.map((t) => (
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

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "listing" : "listings"} found
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-lg border bg-card p-12 text-center">
            <Building2 className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 font-serif text-lg font-bold text-card-foreground">
              No accommodation found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filtered.map((acc) => <AccommodationCard key={acc.id} acc={acc} />)
        )}
      </div>
    </div>
  )
}

function AccommodationCard({ acc }: { acc: Accommodation }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card transition-colors hover:border-secondary">
      <div className="relative h-40">
        <Image
          src={acc.imageUrl}
          alt={acc.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-base font-bold text-card-foreground">{acc.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{acc.type}</p>
          </div>
          <span className="shrink-0 font-serif text-base font-bold text-primary">{acc.price}</span>
        </div>

        <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 shrink-0" />
            {acc.distance}
          </span>
          <span className="flex items-center gap-1.5">
            <Bed className="h-3 w-3 shrink-0" />
            {acc.bedrooms} {acc.bedrooms === 1 ? "bedroom" : "bedrooms"}
          </span>
          <span className="flex items-center gap-1.5">
            {acc.available ? (
              <>
                <CheckCircle2 className="h-3 w-3 shrink-0 text-green-600" />
                <span className="text-green-600">Available</span>
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 shrink-0 text-destructive" />
                <span className="text-destructive">Not available</span>
              </>
            )}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {acc.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity]
            return (
              <span
                key={amenity}
                className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {Icon && <Icon className="h-3 w-3" />}
                {amenity}
              </span>
            )
          })}
          {acc.amenities.length > 4 && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
              +{acc.amenities.length - 4} more
            </span>
          )}
        </div>

        <a
          href={`mailto:${acc.contactEmail}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-colors hover:bg-muted"
        >
          <Mail className="h-3.5 w-3.5" />
          Contact
        </a>
      </div>
    </div>
  )
}
