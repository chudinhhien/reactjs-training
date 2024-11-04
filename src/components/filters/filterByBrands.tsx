import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Brand } from "../../@types/Brand";
import { FilterProps } from "../../@types/FilterProps";
import { getBrands } from "../../api/brandsAPI";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";

const FilterByBrands: React.FC<FilterProps> = ({ title }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const filterOptions = useFilterOptionsFromUrl();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const { brands, ...otherFilter } = filterOptions;
        const data = await getBrands(otherFilter);
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    loadBrands();
  }, [filterOptions]);

  const handleCheckboxChange = (brandName: string) => {
    const selectedBrands = filterOptions.brands ? [...filterOptions.brands] : [];

    if (selectedBrands.includes(brandName)) {
      filterOptions.brands = selectedBrands.filter((name) => name !== brandName);
    } else {
      selectedBrands.push(brandName);
      filterOptions.brands = selectedBrands;
    }
    navigate(`?${queryString.stringify(filterOptions)}`, { replace: true });
  };

  return (
    <div className="border-t border-gray-200 pt-8 pb-8">
      <h2 className="text-gray-800 tracking-wide uppercase pb-4 text-xs font-semibold">{title}</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.name} className="pb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filterOptions.brands?.includes(brand.name) || false}
                onChange={() => handleCheckboxChange(brand.name)}
                className={`h-4 w-4 appearance-none border border-gray-300 rounded-md cursor-pointer transition duration-200 ${
                  filterOptions.brands?.includes(brand.name) ? "bg-[#e2a400] border-[#e2a400]" : "bg-gray-100"
                }`}
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
