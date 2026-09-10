"use client";

import { useSyncExternalStore } from "react";

export function UserGreeting() {
  const name = useSyncExternalStore(
    () => () => undefined,
    () => (JSON.parse(window.localStorage.getItem("grocerymate-user") || "{}").name?.split(" ")[0] || "there"),
    () => "there",
  );

  return <>Good morning, {name}</>;
}