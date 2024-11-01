import { FilterOptions } from "../@types/FilterOptions";

export async function fetchAPI(filters: FilterOptions = {}) {
  const url = process.env.REACT_APP_URL_API as string;

  const facetFilters: string[][] = [
    ...(filters.freeShipping ? [["free_shipping:true"]] : []),
    ...(filters.categoryName ? [["hierarchicalCategories.lvl0:" + filters.categoryName]] : []),
    ...(filters.brands && filters.brands.length > 0 ? [filters.brands.map((brand) => `brand:${brand}`)] : []),
    ...(filters.priceRange ? [["price:[" + filters.priceRange.min + " TO " + filters.priceRange.max + "]"]] : []),
    ...(filters.rating ? [["rating:" + filters.rating]] : []),
  ];

  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "text/plain"
    },
    body: JSON.stringify({
      requests: [
        {
          indexName: "instant_search",
          attributesToSnippet: ["description:10"],
          clickAnalytics: true,
          facetFilters,
          facets: [
            "brand",
            "free_shipping",
            "hierarchicalCategories.lvl0",
            "hierarchicalCategories.lvl1",
            "price",
            "rating"
          ],
          highlightPostTag: "__/ais-highlight__",
          highlightPreTag: "__ais-highlight__",
          hitsPerPage: 16,
          maxValuesPerFacet: 10,
          page: 0,
          removeWordsIfNoResults: "allOptional",
          snippetEllipsisText: "…",
          userToken: process.env.REACT_APP_USER_TOKEN,
          sortFacetValuesBy: "count",
        }
      ]
    })
  }

  return fetch(url,options)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    })
}
