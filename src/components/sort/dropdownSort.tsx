import { useTranslation } from "react-i18next";
import Dropdown from "../dropdown";
import { useNavigate } from "react-router-dom";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";
import queryString from "query-string";

const DropdownSort: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const filters = useFilterOptionsFromUrl();
  const options = [
    t('sort.sort by featured'),
    t('sort.price ascending'),
    t('sort.price descending')
  ]
  const handleSelect = (option: string) => {
    let updatedFilters = { ...filters }
    if(option === options[0]) {
     delete updatedFilters.sortBy;
    }else if(option === options[1]) {
      updatedFilters.sortBy = 'instant_search_price_asc'
    } else if(option === options[2]) {
      updatedFilters.sortBy = 'instant_search_price_desc'
    }
    navigate(`?${queryString.stringify(updatedFilters)}`, { replace: true }); 
  };
  return (
    <>
      <Dropdown options={options} placeholder={t('sort.sort by featured')} onSelect={handleSelect} />
    </>
  )
}

export default DropdownSort;
