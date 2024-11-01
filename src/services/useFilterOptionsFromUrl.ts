import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { FilterOptions } from "../@types/FilterOptions";

const useFilterOptionsFromUrl = (): FilterOptions => {
  const location = useLocation();
  const queries = queryString.parse(location.search);

  const filterOptions: FilterOptions = {
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
  };

  return filterOptions;
};

export default useFilterOptionsFromUrl;
