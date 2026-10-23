"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { authenticateUser, getSessionUser } from "@/lib/auth";

export default function AuthPage() {
  const router = useRouter();
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("Student Learner");
  const [email, setEmail] = useState("student@watcom.academy");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (getSessionUser()) {
      router.replace("/dashboard");
    }
  }, [router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      authenticateUser(email, password, signup ? name : undefined);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in right now.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden panel-gradient p-12 md:flex md:flex-col md:justify-between">
        <Logo />
        <div>
          <p className="eyebrow">Student portal</p>
          <h1 className="mt-4 text-5xl leading-tight">Practical, clinic-led learning.</h1>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Watch lessons, track progress and download your certificates.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 md:hidden">
            <Logo />
          </div>

          <h2 className="text-3xl">{signup ? "Create your account" : "Welcome back"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo account:{" "}
            <span className="font-medium text-foreground">student@watcom.academy</span> /{" "}
            <span className="font-medium text-foreground">password123</span>
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {signup && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name (shown on certificates)</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" variant="luxe" className="h-11 w-full" disabled={busy}>
              {busy ? "Please wait…" : signup ? "Create account" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {signup ? "Already have an account?" : "New to the academy?"}{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => setSignup((v) => !v)}
            >
              {signup ? "Sign in" : "Create one"}
            </button>
          </p>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-[0.18em] text-primary hover:underline"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
