import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import debounce from "debounce";
import { Category } from "../../@types/Category";
import { FilterProps } from "../../@types/FilterProps";
import { getCategories, getSubCategories } from "../../api/categoryAPI";
import triangleDown from "../../assets/icons/triangleDown.svg";
import triangleUp from "../../assets/icons/triangleUp.svg";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";

const FilterByCategory: React.FC<FilterProps> = ({ title }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<{ [key: string]: Category[] }>({});
  const filterOptions = useFilterOptionsFromUrl();
  const navigate = useNavigate();
  const location = useLocation();

  const optionsExcludingCategory = useMemo(() => {
    const { categoryName, ...rest } = filterOptions;
    return rest;
  }, [filterOptions]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(optionsExcludingCategory);
        setCategories((prev) => {
          const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
          return JSON.stringify(sortedData) !== JSON.stringify(prev) ? sortedData : prev;
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [optionsExcludingCategory]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (expandedCategory) {
        try {
          const data = await getSubCategories({ ...optionsExcludingCategory, categoryName: expandedCategory });
          setSubCategories((prev) => ({
            ...prev,
            [expandedCategory]: data,
          }));
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }
    };
    fetchSubCategories();
  }, [expandedCategory, optionsExcludingCategory]);

  const toggleCategory = useCallback(
    (categoryName: string) => {
      setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
    },
    []
  );

  const updateUrlWithCategory = useMemo(
    () =>
      debounce((selectedCategory: string | null) => {
        const currentQueryParams = queryString.parse(location.search);
        const updatedQueryParams = {
          ...currentQueryParams,
          categoryName: selectedCategory || undefined,
        };
        navigate(`/?${queryString.stringify(updatedQueryParams)}`);
      }, 300),
    [navigate, location.search]
  );

  useEffect(() => {
    updateUrlWithCategory(expandedCategory);
  }, [expandedCategory, updateUrlWithCategory]);

  const getSubCategoryName = (fullCategoryName: string) => {
    const parts = fullCategoryName.split(" > ");
    return parts[parts.length - 1];
  };

  return (
    <div className="border-t border-[#ebecf3] pt-8 pb-8">
      <h2 className="text-[#21243d] tracking-[.08rem] uppercase pb-4 text-[0.678rem] font-semibold">{title}</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="pb-4">
            <div
              onClick={() => toggleCategory(category.name)}
              className={`flex items-center cursor-pointer ${
                category.name === filterOptions.categoryName ? "font-bold" : ""
              }`}
            >
              <img
                src={expandedCategory === category.name ? triangleDown : triangleUp}
                alt={`icon-${expandedCategory === category.name ? "down" : "up"}`}
                className="h-2 w-2 mr-2"
              />
              <span className="text-[0.9rem]">{getSubCategoryName(category.name)}</span>
              <span className="text-[rgba(33,36,61,.8)] tracking-[1.1px] bg-[rgba(65,66,71,.08)] rounded-md ml-2 px-1 text-[0.64rem] font-semibold">
                {category.count}
              </span>
            </div>
            {expandedCategory === category.name && subCategories[category.name]?.length > 0 && (
              <ul className="pl-6 mt-2 text-gray-500">
                {subCategories[category.name].map((subCategory) => (
                  <li key={subCategory.name} className="flex items-center pb-4">
                    <span className="text-[0.9rem]">{getSubCategoryName(subCategory.name)}</span>
                    <span className="text-[rgba(33,36,61,.8)] tracking-[1.1px] bg-[rgba(65,66,71,.08)] rounded-md ml-2 px-1 text-[0.64rem] font-semibold">
                      {subCategory.count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByCategory;
