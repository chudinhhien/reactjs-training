import { FilterOptions } from "../@types/FilterOptions";

export async function fetchAPI(filters: FilterOptions = {}) {
  const url = process.env.REACT_APP_URL_API as string;

  const facetFilters: string[][] = [
    ...(filters.freeShipping ? [["free_shipping:true"]] : []),
    ...(filters.categoryName ? [["hierarchicalCategories.lvl0:" + filters.categoryName]] : []),
    ...(filters.brands && filters.brands.length > 0
      ? [filters.brands.map((brand) => `brand:${brand}`)]
      : [])
  ];

  const numericFilters: string[] = [];
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    if (min !== undefined) numericFilters.push(`price>=${min}`);
    if (max !== undefined) numericFilters.push(`price<=${max}`);
  }

  if (filters.rating) {
    numericFilters.push(`rating>=${filters.rating}`);
    numericFilters.push(`rating<=5`);
  }

  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "text/plain",
    },
    body: JSON.stringify({
      requests: [
        {
          indexName: `${filters.sortBy ? filters.sortBy : "instant_search"}`,
          attributesToSnippet: ["description:10"],
          clickAnalytics: true,
          facetFilters,
          numericFilters,
          facets: [
            "brand",
            "free_shipping",
            "hierarchicalCategories.lvl0",
            "hierarchicalCategories.lvl1",
            "price",
            "rating",
          ],
          highlightPostTag: "__/ais-highlight__",
          highlightPreTag: "__ais-highlight__",
          hitsPerPage: `${filters.hits ? filters.hits : 16}`,
          maxValuesPerFacet: 10,
          page: `${filters.page ? filters.page - 1 : 0 }`,
          removeWordsIfNoResults: "allOptional",
          snippetEllipsisText: "…",
          userToken: process.env.REACT_APP_USER_TOKEN,
          sortFacetValuesBy: "count",
          query: filters.query
        },
      ],
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
