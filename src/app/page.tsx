import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { courses, formatPrice } from "@/lib/courses";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-5 md:px-12">
        <Logo />
        <div className="flex gap-3">
          <Button asChild variant="luxeOutline">
            <Link href="/auth">Sign in</Link>
          </Button>
          <Button asChild variant="luxe" className="hidden sm:inline-flex">
            <Link href="/auth?mode=signup">Create account</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:px-12">
        <div>
          <p className="eyebrow">Watcom IV Health & Beauty Academy</p>
          <h1 className="mt-5 text-4xl leading-tight md:text-6xl">
            Learn, practise and get certified.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Your student portal for clinic-led aesthetics and wellness training — video lessons,
            progress tracking and certificates in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="luxe" size="lg" className="h-12">
              <Link href="/auth?mode=signup">Start learning</Link>
            </Button>
            <Button asChild variant="luxeOutline" size="lg" className="h-12">
              <Link href="#courses">View courses</Link>
            </Button>
          </div>
        </div>

        <div className="panel-gradient border p-4 shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Practitioner teaching students"
            width={1600}
            height={1008}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-4 md:px-12">
          {[
            "Choose a course",
            "Purchase & unlock",
            "Watch the lessons",
            "Pass & get certified",
          ].map((title, index) => (
            <div key={title}>
              <span className="inline-flex h-9 w-9 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-xl">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="courses" className="mx-auto max-w-6xl px-6 py-20 md:px-12">
        <p className="eyebrow">Course catalogue</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Training courses</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.slug} className="flex flex-col border bg-card p-6">
              <p className="eyebrow text-rose">{course.category}</p>
              <h3 className="mt-3 font-serif text-xl">{course.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{course.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-serif text-2xl">{formatPrice(course.price)}</span>
                <Link
                  href="/courses"
                  className="text-xs font-bold uppercase tracking-[0.18em] text-primary hover:underline"
                >
                  Enrol →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Watcom IV Health & Beauty · 14 Imperial Arcade, Huddersfield
      </footer>
    </main>
  );
}
