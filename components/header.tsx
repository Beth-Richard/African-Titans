"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Briefcase,
    Home,
    // removed due to MVP scope
    ShieldCheck,
    User,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    // removed due to MVP scope
    { href: "/admin", label: "Admin", icon: ShieldCheck },
    { href: "/profile", label: "Profile", icon: User },
];

type MeUser = { id: string; role: string; name: string; email: string };

export function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [me, setMe] = useState<MeUser | null>(null);

    useEffect(() => {
        fetch("/api/me", { cache: "no-store", credentials: "include" })
            .then((r) => r.json())
            .then((d) => setMe(d.user ?? null))
            .catch(() => setMe(null));
    }, []);

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setMe(null);
        setMobileOpen(false);
        router.push("/login");
        router.refresh();
    }

    return (
        <header className="sticky top-0 z-50 border-b bg-primary text-primary-foreground">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary">
                        <span className="font-serif text-lg font-bold text-secondary-foreground">W</span>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold leading-tight tracking-wide">Student Campus Hub</p>
                        <p className="text-xs leading-tight text-primary-foreground/70">
                            University of Wolverhampton
                        </p>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active =
                            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    active
                                        ? "bg-secondary text-secondary-foreground"
                                        : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Login/Logout (desktop) */}
                    <div className="ml-2">
                        {me ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-md border border-primary-foreground/20 px-3 py-2 text-sm hover:bg-primary-foreground/10"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-md border border-primary-foreground/20 px-3 py-2 text-sm hover:bg-primary-foreground/10"
                            >
                                <User className="h-4 w-4" />
                                Login
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden rounded-md p-2 hover:bg-primary-foreground/10"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile nav */}
            {mobileOpen && (
                <nav className="border-t border-primary-foreground/10 px-4 pb-4 md:hidden">
                    <div className="pt-3 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active =
                                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                        active
                                            ? "bg-secondary text-secondary-foreground"
                                            : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}

                        {/* Login/Logout (mobile) */}
                        <div className="pt-2">
                            {me ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 rounded-md border border-primary-foreground/20 px-3 py-2.5 text-sm hover:bg-primary-foreground/10"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 rounded-md border border-primary-foreground/20 px-3 py-2.5 text-sm hover:bg-primary-foreground/10"
                                >
                                    <User className="h-4 w-4" />
                                    Login
                                </Link>
                            )}
                        </div>

                        {me && (
                            <p className="pt-2 text-xs text-primary-foreground/70">
                                Logged in as {me.email} ({me.role})
                            </p>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
