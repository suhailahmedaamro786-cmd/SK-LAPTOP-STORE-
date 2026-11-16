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

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isPublicProduct(value: unknown): value is PublicProduct {
  if (!isRecord(value)) return false;
  return typeof value.id === "string" &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    (value.brand === null || typeof value.brand === "string") &&
    (value.model === null || typeof value.model === "string") &&
    (value.condition === "new" || value.condition === "used") &&
    Number.isSafeInteger(value.price_pkr) && Number(value.price_pkr) >= 0 &&
    value.currency === "PKR" &&
    (value.short_description === null || typeof value.short_description === "string") &&
    isRecord(value.specifications) &&
    Array.isArray(value.images) && value.images.every(image => typeof image === "string" && image.startsWith("https://")) &&
    (value.availability === "in_stock" || value.availability === "out_of_stock");
}

export async function getPublicProducts(): Promise<ProductListResponse> {
  if (!API_URL) return { items: [], nextCursor: null };
  try {
    const response = await fetch(new URL("/api/public/products?limit=48", API_URL), {
      headers: { accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return { items: [], nextCursor: null };
    const data: unknown = await response.json();
    if (!isRecord(data) || !Array.isArray(data.items)) return { items: [], nextCursor: null };
    return {
      items: data.items.filter(isPublicProduct),
      nextCursor: typeof data.nextCursor === "string" ? data.nextCursor : null,
    };
  } catch {
    return { items: [], nextCursor: null };
  }
}
