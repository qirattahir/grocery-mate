"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  function logout() {
    window.localStorage.removeItem("grocerymate-user");
    router.replace("/login");
  }
  return <button className="button button-secondary" type="button" onClick={logout}>Log out</button>;
}