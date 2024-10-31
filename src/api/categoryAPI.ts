import { Category } from "../@types/Category";
import { fetchAPI } from "../services/fetchAPI";

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchAPI();
    const rawCategories = data.results[0].facets['hierarchicalCategories.lvl0'];
    const rawSubCategories = data.results[0].facets['hierarchicalCategories.lvl1'];
  
    console.log(rawSubCategories);
    const categories: Category[] = Object.entries(rawCategories).map(([name,count]) => ({
      name,
      count: Number(count)
    }))
    return categories;
  } catch(error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getSubCategories(category: string): Promise<Category[]> {
  try {
    const data = await fetchAPI(category);
    const rawSubCategories = data.results[0].facets['hierarchicalCategories.lvl1'];

    const subCategories: Category[] = Object.entries(rawSubCategories).map(([name, count]) => ({
      name,
      count: Number(count)
    }));
    
    return subCategories;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
}
