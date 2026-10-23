import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rose/60 font-serif text-lg text-rose">
        IV
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg text-foreground">Watcom IV</span>
        <span className="block text-[0.6rem] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Academy
        </span>
      </span>
    </Link>
  );
}
