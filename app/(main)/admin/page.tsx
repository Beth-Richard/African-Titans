import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { AdminDashboard } from "@/components/admin-dashboard";

export default async function AdminPage() {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("session_user_id")?.value;

    // Not logged in → go login (or "/" if you prefer)
    if (!sessionUserId) {
        redirect("/login");
    }

    const userId = Number(sessionUserId);
    if (!Number.isFinite(userId)) {
        redirect("/login");
    }

    const [rows]: any = await db.query(
        "SELECT user_id, role FROM users WHERE user_id = ? LIMIT 1",
        [userId]
    );

    const user = rows[0];

    // Logged in but not admin → home
    if (!user || user.role !== "admin") {
        redirect("/");
    }

    // Admin → allow
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <AdminDashboard />
        </div>
    );
}