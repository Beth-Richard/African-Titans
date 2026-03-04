import { JobsBoard } from "@/components/jobs-board";

export default function JobsPage() {
    return (
        <main className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Jobs</h1>
            <JobsBoard />
        </main>
    );
}
