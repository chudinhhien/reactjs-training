import { fetchAPI } from "../services/fetchAPI";
import { FilterOptions } from "../@types/FilterOptions";


export async function getRatings(filters: FilterOptions): Promise<any> {
  try {
    const data = await fetchAPI(filters);
    return data?.results?.[0]?.facets?.rating;
  } catch(error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
