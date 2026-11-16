"use client";
import { FormEvent, useRef, useState } from "react";

type Props = { product: { id: string; title: string; price_pkr: number } };
type Result = { ok?: boolean; order_reference?: string; tracking_token?: string; error?: string; message?: string; shipping?: string };
const money = (value: number) => new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value);

export default function CheckoutForm({ product }: Props) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [payment, setPayment] = useState<"cod" | "bank_transfer">("cod");
  const idempotency = useRef<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setResult(null);
    const data = new FormData(event.currentTarget);
    if (!idempotency.current) idempotency.current = crypto.randomUUID();
    const payload = {
      full_name: data.get("full_name"), phone: data.get("phone"), email: data.get("email") || null,
      address: data.get("address"), city: data.get("city"), province: data.get("province"),
      postal_code: data.get("postal_code") || null, payment_method: payment,
      notes: data.get("notes") || null, items: [{ product_id: product.id, quantity: 1 }],
    };
    try {
      const response = await fetch("/api/checkout", {
        method: "POST", headers: { "content-type": "application/json", "Idempotency-Key": idempotency.current }, body: JSON.stringify(payload),
      });
      const json = await response.json() as Result;
      setResult(response.ok ? json : { error: json.message ?? json.error ?? "Order could not be placed. Please try again." });
      if (response.ok) idempotency.current = null;
    } catch { setResult({ error: "Network issue. Please try again." }); }
    finally { setBusy(false); }
  }
  if (result?.ok && result.order_reference) return <section className="checkout-success"><span className="eyebrow">ORDER REQUEST RECEIVED</span><h2>Thank you.</h2><p>Your reference is <strong>{result.order_reference}</strong>.</p><p>{result.message}</p>{result.tracking_token&&<p><a className="button" href={"/track/"+encodeURIComponent(result.tracking_token)}>Track this order ↗</a></p>}<p>Keep this reference when contacting the store. Payment has not been collected online.</p><a className="button" href="/products">Continue browsing ↗</a></section>;
  return <form className="checkout-form" onSubmit={submit}>
    <div className="checkout-product"><span>YOUR LAPTOP</span><strong>{product.title}</strong><b>Rs. {money(product.price_pkr)}</b></div>
    <label>Full name<input name="full_name" autoComplete="name" minLength={2} maxLength={100} required/></label>
    <label>Mobile number<input name="phone" type="tel" autoComplete="tel" placeholder="03XXXXXXXXX" maxLength={30} required/></label>
    <label>Email (optional)<input name="email" type="email" autoComplete="email" maxLength={254}/></label>
    <label>Full delivery address<textarea name="address" autoComplete="street-address" minLength={8} maxLength={500} required/></label>
    <div className="checkout-fields"><label>City<input name="city" autoComplete="address-level2" maxLength={80} required/></label><label>Province<input name="province" autoComplete="address-level1" defaultValue="Sindh" maxLength={80} required/></label></div>
    <label>Postal code (optional)<input name="postal_code" autoComplete="postal-code" maxLength={20}/></label>
    <fieldset><legend>Payment preference</legend><label className="payment-option"><input type="radio" checked={payment==="cod"} onChange={()=>setPayment("cod")}/> Cash on Delivery (COD)</label><label className="payment-option"><input type="radio" checked={payment==="bank_transfer"} onChange={()=>setPayment("bank_transfer")}/> Bank transfer (details shared after confirmation)</label></fieldset>
    <label>Notes (optional)<textarea name="notes" maxLength={500}/></label>
    <p className="checkout-disclaimer">Shipping charges are not included in the laptop price. The store will confirm delivery charges and stock before fulfilment. No online card payment is available.</p>
    {result?.error && <p className="checkout-error" role="alert">{result.error}</p>}
    <button className="button checkout-submit" disabled={busy}>{busy ? "Submitting…" : "Place order request ↗"}</button>
  </form>;
}
