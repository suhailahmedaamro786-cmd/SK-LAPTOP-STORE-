import SiteHeader from "@/components/site-header";

const categories = [
  { title: "Business Laptops", detail: "Reliable machines for everyday work", href: "/products?category=business" },
  { title: "Student Laptops", detail: "Study, research and learning", href: "/products?category=student" },
  { title: "Gaming Laptops", detail: "Performance-focused machines", href: "/products?category=gaming" },
  { title: "Workstations", detail: "Power for demanding workloads", href: "/products?category=workstation" },
  { title: "Used Laptops", detail: "Individually graded devices", href: "/products?condition=used" },
  { title: "Accessories", detail: "Coming in a later store phase", href: "/products?category=accessories" },
];
const highlights = [
  { title: "New & used laptops", detail: "Condition labels and clear specifications." },
  { title: "Honest product details", detail: "Used devices need unit-specific condition notes." },
  { title: "Pakistan-wide inquiries", detail: "Shipping options will be confirmed before an order." },
];
export default function HomePage() {
  return <main>
    <SiteHeader announcement />
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">BUY SMART · WORK SMART · GROW SMART</span>
        <h1>Find the laptop that moves <em>you forward.</em></h1>
        <p>Explore new and used laptops with clear specifications, honest condition details and helpful support from SK LAPTOP STORE.</p>
        <form className="hero-search" action="/products"><label className="sr-only" htmlFor="store-search">Search laptops</label><input id="store-search" name="q" placeholder="Search brand, model or processor…" /><button type="submit" aria-label="Search laptops">Search ↗</button></form>
        <div className="hero-actions"><a className="button" href="/products">Explore laptops <span>→</span></a><a className="text-link" href="/contact">Talk to our team ↗</a></div>
        <div className="hero-meta"><span>New & used devices</span><span>Pakistan-wide inquiries</span><span>Human support</span></div>
      </div>
      <div className="hero-art" aria-label="Decorative laptop illustration"><div className="glow" /><div className="screen"><div className="screen-mark">SK<span>.</span></div><div className="screen-caption">POWER YOUR NEXT MOVE</div></div><div className="keyboard"><div className="keys" /></div><div className="art-label">TECH THAT WORKS FOR YOU</div></div>
    </section>
    <section className="trust-strip">{highlights.map(item=><article key={item.title}><span className="check">✦</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</section>
    <section id="categories" className="section"><div className="section-heading"><div><span className="eyebrow">SHOP BY NEED</span><h2>Find your <em>perfect fit.</em></h2></div><p>Browse by use case. Live products will be shown only after inventory is verified and published.</p></div>
      <div className="category-grid">{categories.map((item,i)=><a className="category-card" href={item.href} key={item.title}><span className="category-number">0{i+1}</span><div className="category-icon">{["▣","⌘","◈","▤","↗","＋"][i]}</div><h3>{item.title}</h3><p>{item.detail}</p><span className="arrow">↗</span></a>)}</div>
    </section>
    <section id="why-us" className="why-section"><div><span className="eyebrow">THE SK STANDARD</span><h2>Clarity first.<br/><em>Confidence always.</em></h2></div><div className="why-copy"><p>Buying a laptop should feel simple. We are building a store experience around clear specifications, transparent condition details and practical support—not confusing claims.</p><p className="founder">Owned by <strong>Mr. Suhail Ahmed Aamro</strong><br/>Founder of SK DEV TEAM</p><small>Building with ambition for his family and a stronger digital Pakistan.</small></div></section>
    <footer id="contact"><div className="footer-brand"><img src="/sk-laptop-store-logo.svg" alt="SK Laptop Store"/><p>Buy smart. Work smart. Grow smart.</p></div><div><h3>Need help choosing?</h3><p>Ask about current product availability, specifications and pricing.</p><a className="button" href="/contact">Contact the store ↗</a><small>Official WhatsApp contact will be connected before launch.</small></div><div className="copyright">© {new Date().getFullYear()} SK LAPTOP STORE · A SK DEV TEAM venture. <a href="/policies">Store policies</a></div></footer>
  </main>;
}