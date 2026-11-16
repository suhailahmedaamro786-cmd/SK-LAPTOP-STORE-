import "server-only";

export type PublicProduct = {
  id: string;
  slug: string;
  title: string;
  brand: string | null;
  model: string | null;
  condition: "new" | "used";
  price_pkr: number;
  currency: "PKR";
  short_description: string | null;
  specifications: Record<string, string>;
  images: string[];
  availability: "in_stock" | "out_of_stock";
};

type ProductListResponse = { items: PublicProduct[]; nextCursor: string | null };

const API_URL = process.env.STORE_API_URL;

export async function getPublicProducts(): Promise<ProductListResponse> {
  if (!API_URL) return { items: [], nextCursor: null };

  try {
    const response = await fetch(new URL("/api/public/products", API_URL), {
      headers: { accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return { items: [], nextCursor: null };
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("items" in data) || !Array.isArray(data.items)) {
      return { items: [], nextCursor: null };
    }
    return data as ProductListResponse;
  } catch {
    return { items: [], nextCursor: null };
  }
}
