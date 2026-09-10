"use client";

import { useState } from "react";

export function GroceryItem({ name, quantity, category }: { name: string; quantity: string; category: string }) {
  const [bought, setBought] = useState(false);
  return <div className={`list-row grocery-item${bought ? " is-bought" : ""}`}><button className="check-button" type="button" aria-pressed={bought} aria-label={`${bought ? "Unmark" : "Mark"} ${name} as purchased`} onClick={() => setBought((current) => !current)}><span aria-hidden="true">{bought ? "✓" : ""}</span></button><div className="row-copy"><h3>{name}</h3><p className="quantity">{quantity} · {category}</p></div><span className="item-state">{bought ? "Bought" : "To buy"}</span></div>;
}