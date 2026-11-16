"use client";

import { useState } from "react";

const links = [
  { href: "/products", label: "Shop laptops" },
  { href: "/products?condition=used", label: "Used laptops" },
  { href: "/policies", label: "Store policies" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader({ announcement = false }: { announcement?: boolean }) {
  const [open, setOpen] = useState(false);
  return <>
    {announcement && <div className="announcement">SK LAPTOP STORE · Pakistan-wide laptop inquiries</div>}
    <header className="header">
      <a className="brand" href="/" aria-label="SK Laptop Store home">
        <img src="/sk-laptop-store-logo.svg" alt="SK Laptop Store" />
      </a>
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(value => !value)}>
        <span /><span /><span />
      </button>
      <nav className={open ? "site-nav nav-open" : "site-nav"} aria-label="Main navigation">
        {links.map(link => <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <a className="mobile-nav-cta" href="/contact" onClick={() => setOpen(false)}>Ask about a laptop ↗</a>
      </nav>
      <a className="button button-small header-cta" href="/contact">Ask about a laptop ↗</a>
    </header>
  </>;
}
