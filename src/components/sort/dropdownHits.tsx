import { useTranslation } from "react-i18next";
import Dropdown from "../dropdown";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const DropdownHits: React.FC = () => {
  const { t } = useTranslation();
  const filters = useFilterOptionsFromUrl();
  const navigate = useNavigate();
  const options = [
    `16 ${t('hits.hits per page')}`,
    `32 ${t('hits.hits per page')}`,
    `64 ${t('hits.hits per page')}`   
  ]
  const handleSelect = (option: string) => {
    let hits : number;
    let updatedFilters = { ...filters };
    if(option === options[0]) {
      hits = 16;
    } else if(option === options[1]) {
      hits = 32;
    } else {
      hits =64;
    }
    updatedFilters.hits = hits;
    navigate(`?${queryString.stringify(updatedFilters)}`, { replace: true });
  };
  return (
    <>
      <Dropdown options={options} placeholder={`16 ${t('hits.hits per page')}`} onSelect={handleSelect} />
    </>
  )
}

export default DropdownHits;
