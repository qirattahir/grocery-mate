import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { PageHeader } from "../../components/page-primitives";

export default function AddShoppingItemPage() {
  return <AppShell active="/shopping-list"><PageHeader eyebrow="Build your list" title="Add an item" description="Keep the next shop organized with a name and quantity." /><div className="surface placeholder-form"><label>Item name<input type="text" placeholder="e.g. Baby spinach" disabled /></label><label>Quantity<input type="text" placeholder="e.g. 1 bag" disabled /></label><div className="form-actions"><Link className="button button-secondary" href="/shopping-list">Back to list</Link><button className="button button-primary" type="button" disabled>Add item</button></div></div></AppShell>;
}