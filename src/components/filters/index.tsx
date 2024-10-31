import { useTranslation } from "react-i18next";
import clearFilter from '../../assets/icons/clearFilter.svg'
import FilterByCategory from "./filterByCategory";

const Filters: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between items-center h-[80px]">
        <h2 className="text-[#21243d] font-hind text-2xl font-bold">{ t('filters.title') }</h2>
        <button>
          <div className="flex items-center text-[12px] gap-1">
            <img src={clearFilter} alt="icon clear filter" />
            <span className="text-slate-800 text-opacity-50">{ t('filters.clear filter') }</span>
          </div>
        </button>
      </div>
      <FilterByCategory title={t('filters.category')}/>
    </>
  )
}

export default Filters;
