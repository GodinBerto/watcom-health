import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatPrice, getCourse, SAMPLE_VIDEO } from "@/lib/courses";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <main className="mx-auto px-6 py-12 md:px-12">
      <Link
        href="/courses"
        className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
      >
        ← All courses
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="eyebrow text-rose">{course.category}</p>
          <h1 className="mt-3 text-4xl leading-tight">{course.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>

          <div className="mt-8 border bg-card p-2">
            <video
              controls
              poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              src={SAMPLE_VIDEO}
              className="aspect-video w-full bg-foreground"
            />
            <p className="px-2 py-3 text-xs text-muted-foreground">Course introduction</p>
          </div>

          <h2 className="mt-12 text-2xl">What you&apos;ll learn</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2 text-sm">
                <span className="text-rose">✓</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl">Curriculum</h2>
          <div className="mt-4 divide-y border bg-card">
            {course.lessons.map((lesson, index) => (
              <div key={lesson.id} className="flex items-center gap-4 p-4">
                <span className="h-6 w-6 rounded-full border text-center text-xs leading-6">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.summary}</p>
                </div>
                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit border bg-card p-6 shadow-soft lg:sticky lg:top-10">
          <p className="font-serif text-4xl">{formatPrice(course.price)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {course.lessons.length} video lessons · {course.duration} · {course.format}
          </p>
          <Button asChild variant="luxe" className="mt-6 h-12 w-full">
            <Link href={`/learn/${course.slug}/${course.lessons[0]?.id ?? "lesson-1"}`}>
              Start course
            </Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Lifetime access · Certificate on completion
          </p>
        </aside>
      </div>
    </main>
  );
}
