// src/components/Search.tsx
import { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

interface SearchProps {
  onSearch: (query: string) => void;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="searchBox h-[64px] md:w-[740px] w-[90%] md:relative absolute bottom-[-32px] text-black">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="h-[64px] rounded-lg w-full pr-12 pb-0 pl-16"
          aria-label="Search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search..."
          spellCheck="false"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute top-0 left-[5%] flex items-center h-full">
          <SearchIcon className="text-amber-500" />
        </button>
      </form>
    </div>
  );
};

export default Search;
