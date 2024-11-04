export interface FilterOptions {
  categoryName?: string;
  brands?: string[];
  freeShipping?: boolean;
  priceRange?: { min: number; max: number };
  rating?: number;
}
