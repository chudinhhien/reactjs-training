import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import debounce from "debounce";
import { Brand } from "../../@types/Brand";
import { FilterProps } from "../../@types/FilterProps";
import { getBrands } from "../../api/brandsAPI";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";

const FilterByBrands: React.FC<FilterProps> = ({ title }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const filterOptions = useFilterOptionsFromUrl();
  const navigate = useNavigate();
  const location = useLocation();

  const optionsExcludingBrands = useMemo(() => {
    const { brands, ...rest } = filterOptions;
    return rest;
  }, [filterOptions]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands(optionsExcludingBrands);
        setBrands((prev) => (JSON.stringify(data) !== JSON.stringify(prev) ? data : prev));
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, [optionsExcludingBrands]);

  const updateUrlWithSelectedBrands = useMemo(
    () =>
      debounce((updatedBrands: string[]) => {
        const currentQueryParams = queryString.parse(location.search);
        const updatedQueryParams = {
          ...currentQueryParams,
          brands: updatedBrands.length ? updatedBrands : undefined,
        };
        navigate(`/?${queryString.stringify(updatedQueryParams)}`);
      }, 300),
    [navigate, location.search]
  );

  useEffect(() => {
    updateUrlWithSelectedBrands(selectedBrands);
  }, [selectedBrands, updateUrlWithSelectedBrands]);

  const handleCheckboxChange = useCallback((brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((item) => item !== brandName) : [...prev, brandName]
    );
  }, []);

  return (
    <div className="border-t border-gray-200 pt-8 pb-8">
      <h2 className="text-gray-800 tracking-wide uppercase pb-4 text-xs font-semibold">{title}</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.name} className="pb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => handleCheckboxChange(brand.name)}
                className={`h-4 w-4 appearance-none border border-gray-300 rounded-md cursor-pointer transition duration-200 
                  ${selectedBrands.includes(brand.name) ? "bg-[#e2a400] border-[#e2a400]" : "bg-gray-100"}`}
              />
              <span className="flex items-center ml-2">
                <span className="text-sm">{brand.name}</span>
                <span className="ml-2 text-xs bg-gray-200 rounded-md px-1 font-semibold text-gray-700">
                  {brand.count}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByBrands;
