import { fetchAPI } from "../services/fetchAPI";
import { Product } from "../@types/Product";

export async function getProducts(category:string): Promise<Product[]> {
  try {
    const data = await fetchAPI(category);
    return data.results[0].hits as Product[];
  } catch(error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
