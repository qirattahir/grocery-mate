"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAvatar } from "./user-avatar";

const navigation = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/shopping-list", label: "List", icon: "☷" },
  { href: "/shopping", label: "Shop", icon: "✓" },
  { href: "/analytics", label: "Spending", icon: "▥" },
  { href: "/recipes", label: "Ideas", icon: "✦" },
];

export function AppShell({ children, active }: { children: React.ReactNode; active: string }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (window.localStorage.getItem("grocerymate-user")) setReady(true);
      else router.replace("/login");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [router]);

  if (!ready) return <div className="auth-loading" aria-label="Loading GroceryMate" />;

  return <div className="app-frame"><aside className="desktop-sidebar" aria-label="Primary navigation"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">G</span><span>GroceryMate</span></Link><p className="sidebar-kicker">Your everyday grocery companion</p><nav className="sidebar-nav">{navigation.map((item) => <NavLink key={item.href} {...item} active={active === item.href} />)}</nav><div className="sidebar-bottom"><Link className="sidebar-utility" href="/reminders"><span aria-hidden="true">◷</span> Reminders</Link><Link className="sidebar-utility" href="/settings"><span aria-hidden="true">⚙</span> Settings</Link></div></aside><main className="main-content"><div className="mobile-topbar"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">G</span><span>GroceryMate</span></Link><UserAvatar /></div><div className="content-wrap">{children}</div></main><nav className="mobile-bottom-nav" aria-label="Primary navigation">{navigation.map((item) => <NavLink key={item.href} {...item} active={active === item.href} mobile />)}</nav></div>;
}

function NavLink({ href, label, icon, active, mobile = false }: (typeof navigation)[number] & { active: boolean; mobile?: boolean }) {
  return <Link className={`nav-link${active ? " is-active" : ""}${mobile ? " mobile-nav-link" : ""}`} href={href} aria-current={active ? "page" : undefined}><span className="nav-icon" aria-hidden="true">{icon}</span><span>{label}</span></Link>;
}