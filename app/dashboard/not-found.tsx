import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 ">
      <div>
        <Frown className="w-10 text-gray-400" />
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p className="text-red-500">
          The page you are looking for does not exist. Please check the URL or
          go back.
        </p>
        <Link
          href="/dashboard"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Go Back
        </Link>
      </div>
    </main>
  );
}
