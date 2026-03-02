import { EventsBoard } from "@/components/events-board"

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
          Campus Events
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Career fairs, workshops, social events, and more across all campuses.
        </p>
      </div>
      <EventsBoard />
    </div>
  )
}
