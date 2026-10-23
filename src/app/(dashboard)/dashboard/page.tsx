"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { courses } from "@/lib/courses";
import { Button } from "@/components/ui/button";

import { clearSessionUser, getSessionUser } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(() => getSessionUser());
  const enrolled = [courses[0], courses[2]].filter((course): course is (typeof courses)[number] =>
    Boolean(course),
  );

  useEffect(() => {
    const current = getSessionUser();
    if (!current) {
      router.replace("/auth");
      return;
    }
    setUser(current);
  }, [router]);

  return (
    <main className="mx-auto w-full px-6 py-10 md:px-12">
      <div>
        <p className="eyebrow">Student dashboard</p>
        <h1 className="mt-3 text-4xl">Welcome back, {user?.name ?? "Student"}</h1>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Enrolled", String(enrolled.length)],
          ["Lessons done", "8"],
          ["Certificates", "1"],
        ].map(([label, value]) => (
          <div key={label} className="border bg-card p-5">
            <p className="eyebrow text-muted-foreground">{label}</p>
            <p className="mt-2 font-serif text-3xl">{value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl">Your courses</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {enrolled.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="block border bg-card p-6 hover:shadow-soft"
          >
            <p className="eyebrow text-rose">{course.category}</p>
            <h3 className="mt-2 font-serif text-xl">{course.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              {course.lessons.length} lessons · In progress
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex gap-3">
        <Button asChild variant="luxe">
          <Link href="/courses">Browse courses</Link>
        </Button>
        <Button asChild variant="luxeOutline">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
