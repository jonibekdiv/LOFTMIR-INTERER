export type Lang = "uz" | "ru" | "en";
export type LocalizedString = { uz: string; ru: string; en: string };

export type Category = {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  productCount: number;
};

export type ProductColor = {
  name: LocalizedString;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  price: number;
  compareAtPrice?: number;
  categorySlug: string;
  images: string[];
  model3d?: string;
  material: LocalizedString;
  dimensions: { width: number; height: number; depth: number };
  weight: number;
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  productionDays: number;
  tags: string[];
};
