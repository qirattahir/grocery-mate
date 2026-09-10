import { AppShell } from "../components/app-shell";
import { PageHeader } from "../components/page-primitives";
import { LogoutButton } from "../components/logout-button";
import { SettingsPanel } from "../components/settings-panel";
export default function SettingsPage() { return <AppShell active="/settings"><PageHeader eyebrow="Make it yours" title="Settings" description="Personalize your grocery routine and keep your household preferences close." /><SettingsPanel /><div className="settings-logout"><LogoutButton /></div></AppShell>; }