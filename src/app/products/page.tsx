type SearchParams = { q?: string; condition?: string; category?: string };
export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const condition = params.condition === "used" ? "Used" : params.condition === "new" ? "New" : "";
  const category = (params.category ?? "").trim();
  return <main className="catalog-page">
    <header className="header"><a className="brand" href="/"><img src="/sk-laptop-store-logo.svg" alt="SK Laptop Store"/></a><nav><a href="/products">All laptops</a><a href="/products?condition=used">Used laptops</a><a href="/policies">Policies</a><a href="/contact">Contact</a></nav><a className="button button-small" href="/contact">Ask the store ↗</a></header>
    <section className="catalog-hero"><span className="eyebrow">SK LAPTOP STORE CATALOGUE</span><h1>{condition ? condition + " laptops" : "Explore laptops"}<em>.</em></h1><p>We publish products only after stock, specifications, price and condition are checked.</p>
      <form className="catalog-search" action="/products"><input name="q" defaultValue={query} placeholder="Search brand, model or processor…"/><button type="submit">Search ↗</button></form>
      <div className="catalog-filters"><a href="/products" className={!condition ? "filter-active" : ""}>All</a><a href="/products?condition=new" className={condition==="New" ? "filter-active" : ""}>New</a><a href="/products?condition=used" className={condition==="Used" ? "filter-active" : ""}>Used</a></div>
      <div className="empty-catalog"><span className="empty-icon">⌕</span><h2>Verified products are being prepared.</h2><p>{query ? <>No published item can currently be confirmed for “{query}”.</> : "There are no verified products published in this catalogue yet."} Contact the store to ask about current availability. We will not display invented stock or prices.</p><a className="button" href="/contact">Ask about availability ↗</a></div>
      <p className="catalog-note">Selected category: {category || "All categories"} · Inventory feed: not connected yet</p>
    </section>
    <footer className="catalog-footer">© {new Date().getFullYear()} SK LAPTOP STORE · <a href="/policies">Policies</a> · <a href="/contact">Contact</a></footer>
  </main>;
}