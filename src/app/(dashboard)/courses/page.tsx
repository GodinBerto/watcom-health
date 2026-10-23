import Link from "next/link";
import { Button } from "@/components/ui/button";
import { courses, formatPrice } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <main className="mx-auto px-6 py-12 md:px-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Course catalogue</p>
          <h1 className="mt-3 text-4xl">Training courses</h1>
        </div>
        <Button asChild variant="luxeOutline">
          <Link href="/dashboard">Back home</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article key={course.slug} className="flex flex-col border bg-card p-6">
            <p className="eyebrow text-rose">{course.category}</p>
            <h2 className="mt-3 font-serif text-2xl">{course.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{course.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
              <span>{course.duration}</span>
              <span>{course.format}</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {course.outcomes.slice(0, 3).map((outcome) => (
                <li key={outcome} className="flex gap-2">
                  <span className="text-rose">•</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-serif text-2xl">{formatPrice(course.price)}</span>
              <Button asChild variant="luxe">
                <Link href={`/courses/${course.slug}`}>View course</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
