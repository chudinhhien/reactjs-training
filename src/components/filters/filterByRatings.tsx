import { useEffect, useState } from "react";
import { FilterProps } from "../../@types/FilterProps";
import { FaStar, FaRegStar } from "react-icons/fa";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";
import { getRatings } from "../../api/ratingAPI";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const FilterByRatings: React.FC<FilterProps> = ({ title }) => {
  const [ratings,setRatings] = useState();
  const filters = useFilterOptionsFromUrl();
  const navigate = useNavigate();

  useEffect(() => {
    const { rating, ...otherFilter } = filters;
    const loadRatings = async () => {
      const data = await getRatings(otherFilter);
      setRatings(data);
    }
    loadRatings();
  },[filters]);

  let cumulativeCounts: Array<[number, number]> = [];

  if (ratings) {
    const starRatings = Object.entries(ratings)
      .map(([key, value]) => [parseInt(key), value] as [number, number])
      .reverse();

    let cumulativeSum = 0;
    cumulativeCounts = starRatings.map(([stars, count]) => {
      cumulativeSum += count;
      return [stars, cumulativeSum];
    });
  }

  const renderStars = (stars: number) => {
    return (
      <span className={`${filters.rating === stars ? "text-yellow-500" : "text-yellow-300"} flex pb-4`}>
        {Array.from({ length: 5 }, (_, index) =>
          index < stars ? (
            <FaStar key={index} className="mr-2 h-5 w-5" />
          ) : (
            <FaRegStar key={index} className="mr-2 h-5 w-5" />
          )
        )}
      </span>
    );
  };

  const handleRating = (stars: number) => {
    let updatedFilterOptions = { ...filters };
    if(filters.rating === stars) {
      delete updatedFilterOptions.rating;
    } else {
      updatedFilterOptions.rating = stars;
    }
    navigate(`?${queryString.stringify(updatedFilterOptions)}`, { replace: true });
  }

  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="text-gray-800 tracking-wide uppercase text-xs font-semibold mb-4">
        {title}
      </h2>
      <ul className="text-gray-700">
        {cumulativeCounts.map(([stars, count], index) => {
           if (index !== 0 && index !== 5) {
            return (
              <li key={index} className="flex items-center" onClick={() => handleRating(stars)}>
                <div className="flex items-center">
                  {renderStars(stars)}
                  <span className="mb-4 text-[rgba(33,36,61,0.8)] tracking-[1.1px] bg-[rgba(65,66,71,0.08)] rounded-md flex items-center ml-2 px-1 text-[0.64rem] font-semibold">{count}</span>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default FilterByRatings;
