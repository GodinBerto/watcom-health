"use client";

import Link from "next/link";
import { use } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/courses";
import { canTakeQuiz, hasPassed, PASS_MARK, scoreQuiz } from "@/lib/quiz";

export default function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourse(slug);
  const [answers, setAnswers] = useState<Array<number | null>>(() =>
    course ? course.quiz.map(() => null) : [],
  );
  const [result, setResult] = useState<number | null>(null);

  if (!course) {
    return <main className="mx-auto max-w-xl px-6 py-20 text-center">Course not found.</main>;
  }

  const canAccessQuiz = canTakeQuiz(
    course.lessons.map((lesson) => lesson.id),
    course.lessons.map((lesson) => lesson.id),
  );

  if (!canAccessQuiz) {
    return (
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-3xl">Finish all lessons first</h1>
        <p className="mt-3 text-muted-foreground">
          The final quiz unlocks once every lesson is complete.
        </p>
        <Button asChild variant="luxe" className="mt-6">
          <Link href={`/courses/${course.slug}`}>Back to course</Link>
        </Button>
      </main>
    );
  }

  function submit() {
    if (!course) {
      return;
    }
    const score = scoreQuiz(
      course.quiz.map((question) => question.answer),
      answers,
    );
    setResult(score);
  }

  const passed = result !== null && hasPassed(result);

  return (
    <main className="mx-auto px-6 py-12 md:px-12">
      <p className="eyebrow">Final quiz · pass mark {PASS_MARK}%</p>
      <h1 className="mt-3 text-4xl">{course.title}</h1>

      {result !== null ? (
        <div className="mt-8 panel-gradient border p-10 text-center">
          <p className="font-serif text-6xl">{result}%</p>
          <p className="mt-3 text-lg">
            {passed
              ? "You passed!"
              : `You need ${PASS_MARK}% to pass. Review the lessons and try again.`}
          </p>
          {passed ? (
            <Button asChild variant="luxe" className="mt-6">
              <Link href={`/certificate/${course.slug}`}>View certificate</Link>
            </Button>
          ) : (
            <Button
              variant="luxe"
              className="mt-6"
              onClick={() => {
                setResult(null);
                setAnswers(course.quiz.map(() => null));
              }}
            >
              Try again
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {course.quiz.map((question, index) => (
            <fieldset key={`${question.q}-${index}`} className="border bg-card p-6">
              <legend className="sr-only">Question {index + 1}</legend>
              <p className="font-semibold">
                {index + 1}. {question.q}
              </p>
              <div className="mt-4 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-3 border p-3 text-sm ${answers[index] === optionIndex ? "border-primary bg-secondary" : "hover:bg-muted"}`}
                  >
                    <input
                      type="radio"
                      name={`q${index}`}
                      checked={answers[index] === optionIndex}
                      onChange={() =>
                        setAnswers((prev) => {
                          const next = [...prev];
                          next[index] = optionIndex;
                          return next;
                        })
                      }
                      className="accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <Button
            variant="luxe"
            className="h-12 w-full"
            disabled={answers.includes(null)}
            onClick={submit}
          >
            Submit answers
          </Button>
        </div>
      )}
    </main>
  );
}
