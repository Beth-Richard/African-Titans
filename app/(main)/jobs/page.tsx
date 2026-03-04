import { JobsBoard } from "@/components/jobs-board"

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
          Job Opportunities
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find part-time work, internships, and more across all campuses.
        </p>
      </div>
      <JobsBoard />
    </div>
  )
}
