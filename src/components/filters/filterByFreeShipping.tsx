import { useTranslation } from "react-i18next";
import { FilterProps } from "../../@types/FilterProps";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const FilterByFreeShipping: React.FC<FilterProps> = ({ title }) => {
  const { t } = useTranslation();
  const filtersOption = useFilterOptionsFromUrl();
  const navigate = useNavigate();

  const handleToggle = (checked: boolean) => {
    const updatedFilters = {
      ...filtersOption,
      minPrice: filtersOption.priceRange?.min,
      maxPrice: filtersOption.priceRange?.max,
      freeShipping: checked,
    };
    delete updatedFilters.priceRange
    const queryStringified = queryString.stringify(updatedFilters);
    navigate(`?${queryStringified}`, { replace: true });
  };

  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="text-gray-800 tracking-wide uppercase text-xs font-semibold mb-4">
        {title}
      </h2>
      <div className="flex items-center">
        <div className="text-gray-700 basis-3/4">{t('filters.description')}</div>
        <div className="flex items-center basis-1/4">
          <span
            className={`mr-2 font-semibold ${
              filtersOption.freeShipping ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            {filtersOption.freeShipping ? "Yes" : "No"}
          </span>
          <Switch
            checked={filtersOption.freeShipping}
            onChange={handleToggle}
            className="transform transition-colors duration-300 ease-in-out bg-gray-300 rounded-full"
            style={{
              backgroundColor: filtersOption.freeShipping ? "#f9a825" : "#e5e5e5",
              width: "44px",
              height: "24px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterByFreeShipping;
