"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const isSignup = mode === "signup";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");
    const stored = window.localStorage.getItem("grocerymate-account");

    if (isSignup) {
      const name = String(form.get("name") ?? "").trim();
      if (!name || !email || password.length < 6) {
        setError("Add your name, email, and a password of at least 6 characters.");
        return;
      }
      window.localStorage.setItem("grocerymate-account", JSON.stringify({ name, email, password }));
      window.localStorage.setItem("grocerymate-user", JSON.stringify({ name, email }));
      router.push("/");
      return;
    }

    if (!stored) {
      setError("No account found. Create an account first to continue.");
      return;
    }
    const account = JSON.parse(stored) as { name: string; email: string; password: string };
    if (account.email !== email || account.password !== password) {
      setError("Those account details do not match.");
      return;
    }
    window.localStorage.setItem("grocerymate-user", JSON.stringify({ name: account.name, email: account.email }));
    router.push("/");
  }

  return <form className="auth-form" onSubmit={handleSubmit}>
    {isSignup && <label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your full name" required /></label>}
    <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
    <label>Password<input name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} placeholder={isSignup ? "At least 6 characters" : "Your password"} minLength={6} required /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-primary auth-submit" type="submit">{isSignup ? "Create account" : "Log in"}<span aria-hidden="true">→</span></button>
    <p className="auth-switch">{isSignup ? "Already have an account?" : "New to GroceryMate?"} <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Log in" : "Create an account"}</Link></p>
  </form>;
}