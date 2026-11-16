import SiteHeader from "@/components/site-header";
import { getPublicProducts } from "@/lib/store-api";

type SearchParams = { q?: string; condition?: string; category?: string };
function formatPrice(value: number) { return new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value); }

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const condition = params.condition === "used" ? "used" : params.condition === "new" ? "new" : "";
  const category = (params.category ?? "").trim();
  const { items } = await getPublicProducts();
  const products = items.filter(product => {
    const matchesCondition = !condition || product.condition === condition;
    const searchable = [product.title, product.brand ?? "", product.model ?? "", product.short_description ?? "", ...Object.values(product.specifications)].join(" ").toLowerCase();
    const matchesCategory = !category || product.category === category;
    return matchesCondition && matchesCategory && (!query || searchable.includes(query));
  });

  return <main className="catalog-page">
    <SiteHeader />
    <section className="catalog-hero">
      <span className="eyebrow">SK LAPTOP STORE CATALOGUE</span>
      <h1>{category ? category.replace(/-/g, " ") : condition ? condition === "used" ? "Used laptops" : "New laptops" : "Explore laptops"}<em>.</em></h1>
      <p>Verified listings only. Product details, prices and availability are loaded from the store catalogue.</p>
      <form className="catalog-search" action="/products"><input name="q" defaultValue={params.q ?? ""} placeholder="Search brand, model or processor…" />{condition && <input type="hidden" name="condition" value={condition}/>}<button type="submit">Search ↗</button></form>
      <div className="catalog-filters"><a href="/products" className={!condition && !category ? "filter-active" : ""}>All</a><a href="/products?condition=new" className={condition==="new" ? "filter-active" : ""}>New</a><a href="/products?condition=used" className={condition==="used" ? "filter-active" : ""}>Used</a></div>
      {products.length > 0 ? <div className="product-grid">
        {products.map(product => <article className="product-card" key={product.id}>
          <a className="product-image" href={`/contact?product=${encodeURIComponent(product.slug)}`}>
            {product.images[0] ? <img src={product.images[0]} alt={product.title} loading="lazy"/> : <span className="product-image-fallback">SK</span>}
            <span className={`stock-pill ${product.availability === "in_stock" ? "stock-live" : "stock-out"}`}>{product.availability === "in_stock" ? "In stock" : "Currently unavailable"}</span>
          </a>
          <div className="product-card-body"><span className="product-meta">{product.condition === "used" ? "USED" : "NEW"}{product.brand ? " · " + product.brand : ""}</span>
            <h2>{product.title}</h2>{product.model && <p className="product-model">{product.model}</p>}{product.short_description && <p className="product-description">{product.short_description}</p>}
            <div className="product-card-bottom"><strong>Rs. {formatPrice(product.price_pkr)}</strong><span><a href={`/contact?product=${encodeURIComponent(product.slug)}`}>Enquire ↗</a>{product.availability === "in_stock" && <a className="product-buy-link" href={`/checkout?product=${encodeURIComponent(product.slug)}`}>Order now ↗</a>}</span></div>
          </div>
        </article>)}
      </div> : <div className="empty-catalog"><span className="empty-icon">⌕</span><h2>{items.length === 0 ? "Verified products are being prepared." : "No matching laptops found."}</h2><p>{items.length === 0 ? "There are no verified products published in this catalogue yet, or the store feed is not configured. We will not display invented stock or prices." : "Try another brand, model or condition filter. You can also contact the store to ask about availability."}</p><a className="button" href="/contact">Ask about availability ↗</a></div>}
      <p className="catalog-note">Showing {products.length} verified listing{products.length === 1 ? "" : "s"} · Prices shown in PKR · {category ? `Category: ${category}` : "Nationwide enquiries welcome"}</p>
    </section>
    <footer className="catalog-footer">© {new Date().getFullYear()} SK LAPTOP STORE · <a href="/policies">Policies</a> · <a href="/contact">Contact</a></footer>
  </main>;
}