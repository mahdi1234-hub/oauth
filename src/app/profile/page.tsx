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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Profile
          </h1>
        </div>

        <div className="flex flex-col items-center gap-6">
          {session.user?.image && (
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-100 dark:ring-blue-900">
              <Image
                src={session.user.image}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="w-full space-y-4">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Name
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {session.user?.name || "N/A"}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Email
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {session.user?.email || "N/A"}
              </p>
            </div>

            {session.user?.id && (
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  User ID
                </label>
                <p className="break-all font-mono text-sm text-gray-700 dark:text-gray-300">
                  {session.user.id}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 w-full rounded-lg bg-red-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
