import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary">
                <span className="font-serif text-base font-bold text-secondary-foreground">W</span>
              </div>
              <p className="text-sm font-bold">Student Campus Hub</p>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
              Connecting University of Wolverhampton students with local opportunities across
              all three campuses.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/jobs" className="hover:text-secondary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:text-secondary transition-colors">
                  Accommodation
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-secondary transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Campuses</h3>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li>Wolverhampton City Campus</li>
              <li>Telford Innovation Campus</li>
              <li>Walsall Campus</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li>hub@wlv.ac.uk</li>
              <li>+44 (0)1902 321000</li>
              <li>Wulfruna Street, WV1 1LY</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} University of Wolverhampton. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
