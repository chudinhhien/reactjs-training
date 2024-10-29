export async function fetchAPI() {
  const url = process.env.REACT_APP_URL_API as string;
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
          facetFilters: [["free_shipping:true"]],
          facets: [
            "brand",
            "free_shipping",
            "hierarchicalCategories.lvl0",
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
          userToken: process.env.REACT_APP_USER_TOKEN
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
