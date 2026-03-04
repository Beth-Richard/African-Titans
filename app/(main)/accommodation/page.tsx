import { AccommodationBoard } from "@/components/accommodation-board"

export default function AccommodationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
          Accommodation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find student halls, private rentals, and shared houses near campus.
        </p>
      </div>
      <AccommodationBoard />
    </div>
  )
}
