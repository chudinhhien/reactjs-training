import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { FilterOptions } from "../@types/FilterOptions";

const useFilterOptionsFromUrl = (): FilterOptions => {
  const location = useLocation();
  const queries = queryString.parse(location.search);

  const filterOptions = useMemo(() => {
    return {
      categoryName: queries.categoryName as string,
      brands: queries.brands
        ? (Array.isArray(queries.brands)
            ? queries.brands.filter((brand): brand is string => brand !== null)
            : [queries.brands].filter((brand): brand is string => brand !== null))
        : undefined,
      freeShipping: queries.freeShipping === "true",
      priceRange: queries.minPrice && queries.maxPrice
        ? { min: Number(queries.minPrice), max: Number(queries.maxPrice) }
        : undefined,
      rating: queries.rating ? Number(queries.rating) : undefined,
      sortBy: queries.sortBy as string,
      page: queries.page ? Number(queries.page) : undefined,
      hits: queries.hits ? Number(queries.hits) : undefined,
      query: queries.query as string
    };
  }, [
    queries.categoryName,
    queries.brands,
    queries.freeShipping,
    queries.minPrice,
    queries.maxPrice,
    queries.rating,
    queries.sortBy,
    queries.hits,
    queries.page,
    queries.query
  ]);

  return filterOptions;
};

export default useFilterOptionsFromUrl;
