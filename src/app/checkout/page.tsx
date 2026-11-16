import { notFound } from "next/navigation";
import { getPublicProducts } from "@/lib/store-api";
import CheckoutForm from "@/components/checkout-form";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product: slug } = await searchParams;
  if (!slug) notFound();
  const { items } = await getPublicProducts();
  const product = items.find(item => item.slug === slug && item.availability === "in_stock");
  if (!product) notFound();
  return <main className="checkout-page">
    <header className="header"><a className="brand" href="/"><img src="/sk-laptop-store-logo.svg" alt="SK Laptop Store"/></a><nav><a href="/products">All laptops</a><a href="/policies">Policies</a><a href="/contact">Contact</a></nav></header>
    <section className="checkout-shell"><div><span className="eyebrow">SECURE ORDER REQUEST</span><h1>Complete your <em>order.</em></h1><p>Share your delivery details. We will verify stock and confirm shipping charges before fulfilment.</p><div className="checkout-steps"><span>01 · Details</span><span>02 · Store confirmation</span><span>03 · Delivery</span></div></div><CheckoutForm product={{ id: product.id, title: product.title, price_pkr: product.price_pkr }}/></section>
    <footer className="catalog-footer">© {new Date().getFullYear()} SK LAPTOP STORE · <a href="/policies">Policies</a></footer>
  </main>;
}
