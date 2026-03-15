"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-lg text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <div className="flex flex-col items-center">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt="Profile picture"
              width={96}
              height={96}
              className="rounded-full border-4 border-zinc-200 dark:border-zinc-700"
            />
          )}

          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {session.user?.name || "User"}
          </h1>

          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {session.user?.email || "No email provided"}
          </p>

          <div className="mt-6 w-full rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Profile Details
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Name</span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {session.user?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Email</span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {session.user?.email || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-6 w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
