import { fetchAPI } from "../services/fetchAPI";
import { Product } from "../@types/Product";
import { FilterOptions } from "../@types/FilterOptions";

export async function getProducts(filters: FilterOptions): Promise<Product[]> {

  try {
    const data = await fetchAPI(filters);
    return data.results[0].hits as Product[];
  } catch(error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
