import logo from '../assets/images/logo.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/languageSwitcher';

interface HeaderProps {
  title: string;
  subTitle?: string;
}

const Header = ({ title, subTitle }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  }

  return (
    <header className="relative md:bg-[url('./assets/images/bg.png')] bg-[url('./assets/images/bg-moblie.png')] p-6 bg-transparent bg-bottom md:min-h-[368px] min-h-[300px] bg-cover flex flex-col items-center md:justify-between justify-center text-white pt-[64px] pb-[100px] text-center">
      <img src={logo} alt="Logo" className="h-[24px] w-[92px]" />
      <p className='text-[38px] font-light my-[38px]'>{title}</p>
      <div className='searchBox h-[64px] md:w-[740px] w-[90%] md:relative absolute bottom-[-32px] text-black'>
        <form role='search'>
          <input 
            className="h-[64px] rounded-lg w-full pr-12 pb-0 pl-16" 
            aria-label="Search" 
            autoComplete="off" 
            autoCorrect="off" 
            autoCapitalize="off" 
            placeholder={t('placeholder.search')}
            spellCheck="false" 
            type="search"
          />
          <button type='submit' className='absolute top-0 left-[5%] flex items-center h-full'>
            <SearchIcon className='text-amber-500' />
          </button>
        </form>
      </div>
      {subTitle && <h2 className="text-2xl mt-2">{subTitle}</h2>}
      <LanguageSwitcher changeLanguage={changeLanguage} currentLang={i18n.language} />
    </header>
  );
};

export default Header;
