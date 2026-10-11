import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    slug: "javonlar",
    name: { uz: "Javonlar", ru: "Polki", en: "Shelves" },
    description: {
      uz: "Minimalist va zamonaviy javonlar",
      ru: "Minimalistichnye i sovremennye polki",
      en: "Minimalist and modern shelves",
    },
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80&auto=format&fit=crop",
    productCount: 12,
  },
  {
    id: "cat-2",
    slug: "stollar",
    name: { uz: "Stollar", ru: "Stoly", en: "Tables" },
    description: {
      uz: "Ish va ovqat stollari",
      ru: "Rabochiye i obedennye stoly",
      en: "Work and dining tables",
    },
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80&auto=format&fit=crop",
    productCount: 8,
  },
  {
    id: "cat-3",
    slug: "stullar",
    name: { uz: "Stullar", ru: "Stulya", en: "Chairs" },
    description: {
      uz: "Ofis va dam olish stullari",
      ru: "Ofisnye i launj-kresla",
      en: "Office and lounge chairs",
    },
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80&auto=format&fit=crop",
    productCount: 15,
  },
  {
    id: "cat-4",
    slug: "shkaflar",
    name: { uz: "Shkaflar", ru: "Shkafy", en: "Cabinets" },
    description: {
      uz: "Kitob va kiyim shkaflari",
      ru: "Knijnye i platyanye shkafy",
      en: "Book and wardrobe cabinets",
    },
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80&auto=format&fit=crop",
    productCount: 6,
  },
];
