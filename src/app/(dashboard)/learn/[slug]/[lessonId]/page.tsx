"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCourse, SAMPLE_VIDEO } from "@/lib/courses";

export default function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const router = useRouter();
  const { slug, lessonId } = use(params);
  const course = getCourse(slug);
  const lesson = course?.lessons.find((item) => item.id === lessonId);

  if (!course || !lesson) {
    return <main className="mx-auto max-w-xl px-6 py-20 text-center">Lesson not found.</main>;
  }

  const idx = course.lessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = course.lessons[idx + 1];

  function handleComplete() {
    if (!course) {
      return;
    }
    if (nextLesson) {
      router.push(`/learn/${course.slug}/${nextLesson.id}`);
      return;
    }
    router.push(`/quiz/${course.slug}`);
  }

  return (
    <main className="mx-auto grid gap-8 px-6 py-12 lg:grid-cols-[1fr_300px] md:px-12">
      <div>
        <Link
          href={`/courses/${course.slug}`}
          className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
        >
          ← {course.title}
        </Link>

        <video
          key={lesson.id}
          controls
          poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
          src={SAMPLE_VIDEO}
          className="mt-6 aspect-video w-full bg-foreground"
        />

        <p className="eyebrow mt-8">
          Lesson {idx + 1} of {course.lessons.length}
        </p>
        <h1 className="mt-2 text-3xl">{lesson.title}</h1>
        <p className="mt-3 text-muted-foreground">{lesson.summary}</p>

        <Button variant="luxe" className="mt-8 h-12" onClick={handleComplete}>
          {nextLesson ? "Mark complete & continue" : "Mark complete & take quiz"}
        </Button>
      </div>

      <aside className="h-fit border bg-card">
        <p className="eyebrow border-b p-4">Lessons</p>
        {course.lessons.map((item, index) => (
          <Link
            key={item.id}
            href={`/learn/${course.slug}/${item.id}`}
            className={`flex items-center gap-3 border-b p-4 text-sm hover:bg-secondary ${item.id === lesson.id ? "bg-secondary font-semibold" : ""}`}
          >
            {item.id === lesson.id ? (
              <span className="text-rose">●</span>
            ) : (
              <span className="w-4 text-xs text-muted-foreground">{index + 1}</span>
            )}
            {item.title}
          </Link>
        ))}
      </aside>
    </main>
  );
}
