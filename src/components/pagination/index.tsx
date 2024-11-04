import { useEffect, useState } from "react";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";
import { useDataContext } from "../../context/DataContext";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const filters = useFilterOptionsFromUrl();
  const { data } = useDataContext();
  const navigate = useNavigate();
  const totalPages = data ? data.results[0].nbPages : 0;

  useEffect(() => {
    setCurrentPage(filters.page || 1);
  }, [filters.page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (filters.page !== page) {
        const updatedFilters = { ...filters };
        updatedFilters.page = page;
        setCurrentPage(page);
        navigate(`?${queryString.stringify(updatedFilters)}`, { replace: true });
      }

    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxDisplayedPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = startPage + maxDisplayedPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-1 text-gray-500 hover:text-gray-700"
          disabled={currentPage === 1}
        >
          &#8249;
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-md font-semibold ${currentPage === page
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                : "bg-gray-100 text-gray-800"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-1 text-gray-500 hover:text-gray-700"
          disabled={currentPage === totalPages}
        >
          &#8250;
        </button>
      </div>
    </div>

  );
};

export default Pagination;
