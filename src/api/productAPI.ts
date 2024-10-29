import { fetchAPI } from "../services/fetchAPI";
import { Product } from "../@types/Product";

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchAPI();
    return data.results[0].hits as Product[];
  } catch(error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
