interface LanguageSwitcherProps {
  changeLanguage: (lang: string) => void;
  currentLang: string;
}

const LanguageSwitcher = ({ changeLanguage, currentLang }: LanguageSwitcherProps) => {
  return (
    <div className="absolute right-5 top-0 mt-4 flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-1 rounded-full transition-all duration-300 
          ${currentLang === 'en' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('vi')}
        className={`px-4 py-1 rounded-full transition-all duration-300 
          ${currentLang === 'vi' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600'}`}
      >
        VI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
