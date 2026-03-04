import Link from "next/link"
import Image from "next/image"
import { Briefcase, Building2, Calendar, ArrowRight, MapPin, Users, Star } from "lucide-react"
import { getApprovedJobs, getUpcomingEvents } from "@/lib/data"

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-serif text-3xl font-bold text-secondary-foreground lg:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border bg-card p-6 transition-colors hover:border-secondary"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/20">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-4 font-serif text-lg font-bold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary group-hover:text-secondary-foreground">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default function HomePage() {
  const jobs = getApprovedJobs()
  const events = getUpcomingEvents()
  const recentJobs = jobs.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground">
        <Image
          src="/images/hero-campus.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-secondary">
              University of Wolverhampton
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-balance lg:text-5xl">
              Your gateway to local opportunities
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">
              Find part-time jobs, accommodation, and events across Wolverhampton, Telford, and
              Walsall campuses. Built for students, by the university.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                <Briefcase className="h-4 w-4" />
                Browse Jobs
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <Calendar className="h-4 w-4" />
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-secondary/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          <StatCard value={`${jobs.length}+`} label="Active Jobs" />
          <StatCard value="3" label="Campuses" />
          <StatCard value={`${events.length}`} label="Upcoming Events" />
          <StatCard value="1,200+" label="Students Served" />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
            Everything you need in one place
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            The Student Campus Hub brings together jobs, accommodation, events, and support across
            all university campuses.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Briefcase}
            title="Local Jobs"
            description="Browse part-time, full-time, seasonal, and internship opportunities from employers across the West Midlands."
            href="/jobs"
          />
          <FeatureCard
            icon={Building2}
            title="Accommodation"
            description="Find student halls, private rentals, and shared houses near your campus with verified listings."
            href="/accommodation"
          />
          <FeatureCard
            icon={Calendar}
            title="Campus Events"
            description="Stay updated with career fairs, workshops, social events, and wellbeing activities across all campuses."
            href="/events"
          />
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Latest Opportunities</h2>
              <p className="mt-1 text-sm text-muted-foreground">Recently posted jobs for students</p>
            </div>
            <Link
              href="/jobs"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group rounded-lg border bg-card p-5 transition-colors hover:border-secondary"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {job.type}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-base font-bold text-card-foreground">{job.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.campus}
                  </span>
                  <span className="font-medium text-primary">{job.salary}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/jobs" className="text-sm font-medium text-primary hover:underline">
              View all jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Campuses */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center font-serif text-2xl font-bold text-foreground">Our Campuses</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "Wolverhampton",
              desc: "City campus in the heart of Wolverhampton with modern facilities and strong industry links.",
              students: "18,000+",
              image: "/images/campus-wolverhampton.jpg",
            },
            {
              name: "Telford",
              desc: "Innovation campus focused on engineering, computing, and enterprise in Shropshire.",
              students: "3,500+",
              image: "/images/campus-telford.jpg",
            },
            {
              name: "Walsall",
              desc: "Specialist campus for education, sport, and performing arts in the Black Country.",
              students: "4,000+",
              image: "/images/campus-walsall.jpg",
            },
          ].map((campus) => (
            <div key={campus.name} className="overflow-hidden rounded-lg border bg-card">
              <div className="relative h-40">
                <Image
                  src={campus.image}
                  alt={`${campus.name} campus`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-card-foreground">{campus.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{campus.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {campus.students} students
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <h2 className="font-serif text-2xl font-bold">Ready to find your next opportunity?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/70">
            Join thousands of University of Wolverhampton students already using the Campus Hub.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
