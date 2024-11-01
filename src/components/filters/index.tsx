import { useTranslation } from "react-i18next";
import clearFilter from '../../assets/icons/clearFilter.svg'
import FilterByCategory from "./filterByCategory";
import FilterByBrands from "./filterByBrands";
import FilterByPrice from "./filterByPrice";
import FilterByFreeShipping from "./filterByFreeShipping";
import FilterByRatings from "./filterByRatings";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";
import { useNavigate } from "react-router-dom";


const Filters: React.FC = () => {
  const { t } = useTranslation();
  const filters = useFilterOptionsFromUrl();
  const navigate = useNavigate();
  const clearAllFilters = () => {
    navigate(`?sortBy=${filters.sortBy || ""}`);
  };
  return (
    <>
      <div className="flex justify-between items-center h-[80px]">
        <h2 className="text-[#21243d] font-hind text-2xl font-bold">{t('filters.title')}</h2>
        <button onClick={clearAllFilters}>
          <div className="flex items-center text-[12px] gap-1">
            <img src={clearFilter} alt="icon clear filter" />
            <span className="text-slate-800 text-opacity-50">{t('filters.clear filter')}</span>
          </div>
        </button>
      </div>
      <FilterByCategory title={t('filters.category')} />
      <FilterByBrands title={t('filters.brands')} />
      <FilterByPrice title={t('filters.price')} />
      <FilterByFreeShipping title={t('filters.free shipping')} />
      <FilterByRatings title={t('filters.ratings')} />
    </>
  )
}

export default Filters;
