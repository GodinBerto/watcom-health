export const PASS_MARK = 80; // percent required to earn a certificate

export function scoreQuiz(correct: number[], answers: (number | null)[]): number {
  if (correct.length === 0) return 0;
  const right = correct.filter((c, i) => answers[i] === c).length;
  return Math.round((right / correct.length) * 100);
}

export function hasPassed(score: number): boolean {
  return score >= PASS_MARK;
}

export function canTakeQuiz(lessonIds: string[], completed: string[]): boolean {
  return lessonIds.every((id) => completed.includes(id));
}
