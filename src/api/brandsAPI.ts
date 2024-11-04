import { Brand } from "../@types/Brand";
import { FilterOptions } from "../@types/FilterOptions";
import { fetchAPI } from "../services/fetchAPI";

export async function getBrands(filters: FilterOptions): Promise<Brand[]> {
  try {
    const data = await fetchAPI(filters);
    const rawBrands = data.results[0].facets['brand'];
  
    const brands: Brand[] = Object.entries(rawBrands).map(([name,count]) => ({
      name,
      count: Number(count)
    }))
    return brands;
  } catch(error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
