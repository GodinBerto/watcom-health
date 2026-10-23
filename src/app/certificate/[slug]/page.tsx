import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/courses";

export default async function CertificatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:px-12">
      <div className="border bg-card p-10 text-center shadow-soft">
        <p className="eyebrow text-rose">Certificate of Completion</p>
        <h1 className="mt-4 font-serif text-4xl">Watcom IV Academy</h1>
        <p className="mt-6 text-lg text-muted-foreground">This certifies that</p>
        <p className="mt-3 font-serif text-3xl">Student Practitioner</p>
        <p className="mt-6 text-muted-foreground">has successfully completed</p>
        <p className="mt-2 font-serif text-2xl">{course.title}</p>
        <div className="mt-8 border-t border-b py-4 text-sm text-muted-foreground">
          Pass mark: 80% · Awarded for successful completion of the final assessment
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Button asChild variant="luxe">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
        <Button asChild variant="luxeOutline">
          <Link href="/courses">More courses</Link>
        </Button>
      </div>
    </main>
  );
}
