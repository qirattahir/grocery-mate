"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

export function UserAvatar() {
  const initials = useSyncExternalStore(
    () => () => undefined,
    () => {
      const name = (JSON.parse(window.localStorage.getItem("grocerymate-user") || "{}").name ?? "") as string;
      return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "••";
    },
    () => "••",
  );

  return <Link className="profile-button" href="/settings" aria-label="Open settings">{initials}</Link>;
}
