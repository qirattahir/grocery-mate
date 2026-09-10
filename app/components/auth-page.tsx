import Link from "next/link";
import { AuthForm } from "./auth-form";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  return <main className="auth-page"><div className="auth-panel"><Link className="brand auth-brand" href="/"><span className="brand-mark" aria-hidden="true">G</span><span>GroceryMate</span></Link><div className="auth-intro"><p className="eyebrow">A calmer grocery routine</p><h1>{isSignup ? "Make planning feel lighter." : "Welcome back."}</h1><p>{isSignup ? "Create your account to organize lists, shopping, and household staples." : "Log in to pick up where your grocery planning left off."}</p></div><AuthForm mode={mode} /></div></main>;
}