"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { name: string; email: string };
type Preferences = { currency: string; reminders: boolean; pantry: string[] };

const defaultPreferences: Preferences = { currency: "PKR (Rs.)", reminders: true, pantry: ["Salt", "Black pepper", "Cooking oil"] };

export function SettingsPanel() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [editing, setEditing] = useState(false);
  const [managingPantry, setManagingPantry] = useState(false);
  const [newStaple, setNewStaple] = useState("");
  const [form, setForm] = useState<User>({ name: "", email: "" });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedUser = window.localStorage.getItem("grocerymate-user");
      if (!storedUser) {
        router.replace("/login");
        return;
      }
      const currentUser = JSON.parse(storedUser) as User;
      setUser(currentUser);
      const storedPreferences = window.localStorage.getItem("grocerymate-preferences");
      if (storedPreferences) setPreferences({ ...defaultPreferences, ...(JSON.parse(storedPreferences) as Partial<Preferences>) });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [router]);

  function savePreferences(next: Preferences) {
    setPreferences(next);
    window.localStorage.setItem("grocerymate-preferences", JSON.stringify(next));
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextUser = { name: form.name.trim(), email: form.email.trim().toLowerCase() };
    if (!nextUser.name || !nextUser.email) return;
    setUser(nextUser);
    window.localStorage.setItem("grocerymate-user", JSON.stringify(nextUser));
    const storedAccount = window.localStorage.getItem("grocerymate-account");
    if (storedAccount) {
      const account = JSON.parse(storedAccount) as User & { password: string };
      window.localStorage.setItem("grocerymate-account", JSON.stringify({ ...account, ...nextUser }));
    }
    setEditing(false);
  }

  function addStaple(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const staple = newStaple.trim();
    if (!staple) return;
    savePreferences({ ...preferences, pantry: [...preferences.pantry, staple] });
    setNewStaple("");
  }

  if (!user) return null;
  const initials = user.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return <>
    <section className="surface settings-card">
      <div className="settings-profile"><span className="settings-avatar" aria-hidden="true">{initials}</span><div className="settings-profile-copy"><h3>{user.name}</h3><p>{user.email}</p></div><button className="button button-secondary settings-edit" type="button" onClick={() => { setForm(user); setEditing((current) => !current); }}>{editing ? "Close" : "Edit"}</button></div>
      {editing && <form className="settings-edit-form" onSubmit={saveProfile}><label>Full name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" /></label><label>Email<input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" autoComplete="email" /></label><div className="settings-edit-actions"><button className="button button-primary" type="submit">Save changes</button><button className="button button-secondary" type="button" onClick={() => { setForm(user); setEditing(false); }}>Cancel</button></div></form>}
    </section>
    <section className="surface settings-card" aria-labelledby="preferences-heading"><h2 id="preferences-heading">Preferences</h2><div className="settings-preference"><div><p>Currency</p><small>Used for your grocery totals</small></div><span className="settings-value-button">{preferences.currency}</span></div><div className="settings-preference"><div><p>Grocery reminders</p><small>Keep track of items you still need</small></div><button className={`switch${preferences.reminders ? " is-on" : ""}`} type="button" aria-pressed={preferences.reminders} aria-label={`Turn reminders ${preferences.reminders ? "off" : "on"}`} onClick={() => savePreferences({ ...preferences, reminders: !preferences.reminders })} /></div><div className="settings-preference"><div><p>Pantry staples</p><small>{preferences.pantry.length} items saved for recipe ideas</small></div><button className="settings-value-button" type="button" onClick={() => setManagingPantry((current) => !current)}>{managingPantry ? "Close" : "Manage"}</button></div>{managingPantry && <div className="pantry-editor"><div className="pantry-chips">{preferences.pantry.map((staple) => <span className="pantry-chip" key={staple}>{staple}</span>)}</div><form className="pantry-add" onSubmit={addStaple}><input value={newStaple} onChange={(event) => setNewStaple(event.target.value)} placeholder="Add a staple" aria-label="New pantry staple" /><button className="button button-secondary" type="submit">Add</button></form></div>}</section>
  </>;
}
