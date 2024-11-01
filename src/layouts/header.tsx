// src/components/Header.tsx
import logo from '../assets/images/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/languageSwitcher';
import Search from '../components/search';
import useFilterOptionsFromUrl from '../services/useFilterOptionsFromUrl';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useCallback } from 'react';

interface HeaderProps {
  title: string;
  subTitle?: string;
}

const Header = ({ title, subTitle }: HeaderProps) => {
  const { i18n } = useTranslation();
  const filters = useFilterOptionsFromUrl();
  const navigate = useNavigate();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSearch = useCallback((query: string) => {
    let updatedFilters = { ...filters };
    updatedFilters.query = query;
    navigate(`?${queryString.stringify(updatedFilters)}`, { replace: true });
  }, [filters, navigate]);

  return (
    <header className="relative md:bg-[url('./assets/images/bg.png')] bg-[url('./assets/images/bg-moblie.png')] p-6 bg-transparent bg-bottom md:min-h-[368px] min-h-[300px] bg-cover flex flex-col items-center md:justify-between justify-center text-white pt-[64px] pb-[100px] text-center">
      <img src={logo} alt="Logo" className="h-[24px] w-[92px]" />
      <p className="text-[38px] font-light my-[38px]">{title}</p>
      <Search onSearch={handleSearch} />
      {subTitle && <h2 className="text-2xl mt-2">{subTitle}</h2>}
      <LanguageSwitcher changeLanguage={changeLanguage} currentLang={i18n.language} />
    </header>
  );
};

export default Header;
