import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Category } from "../../@types/Category";
import { FilterProps } from "../../@types/FilterProps";
import { getCategories, getSubCategories } from "../../api/categoryAPI";
import triangleDown from "../../assets/icons/triangleDown.svg";
import triangleUp from "../../assets/icons/triangleUp.svg";
import useFilterOptionsFromUrl from "../../services/useFilterOptionsFromUrl";

const FilterByCategory: React.FC<FilterProps> = ({ title }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const filterOptions = useFilterOptionsFromUrl();
  const navigate = useNavigate();

  const toggleCategory = (categoryName: string) => {
    let updatedFilterOptions = { ...filterOptions };

    if (filterOptions.categoryName === categoryName) {
      delete updatedFilterOptions.categoryName;
      setSubCategories([]);
    } else {
      updatedFilterOptions.categoryName = categoryName;
    }

    navigate(`?${queryString.stringify(updatedFilterOptions)}`, { replace: true });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (filterOptions.categoryName) {
          const subCategoriesData = await getSubCategories(filterOptions);
          subCategoriesData.sort((a, b) => a.name.localeCompare(b.name));
          setSubCategories(subCategoriesData);
        } else {
          const { categoryName, ...otherFilter } = filterOptions;
          const data = await getCategories(otherFilter);
          data.sort((a, b) => a.name.localeCompare(b.name));
          setCategories(data);
          setSubCategories([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [filterOptions]);

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
                src={filterOptions.categoryName === category.name ? triangleDown : triangleUp}
                alt={`icon-${filterOptions.categoryName === category.name ? "down" : "up"}`}
                className="h-2 w-2 mr-2"
              />
              <span className="text-[0.9rem]">{category.name}</span>
              <span className="text-[rgba(33,36,61,.8)] tracking-[1.1px] bg-[rgba(65,66,71,.08)] rounded-md ml-2 px-1 text-[0.64rem] font-semibold">
                {category.count}
              </span>
            </div>
            {category.name === filterOptions.categoryName && subCategories.length > 0 && (
              <ul className="pl-6 pt-4 text-gray-500">
                {subCategories.map((subCategory) => {
                  const subCategoryName = subCategory.name.split(">").pop()?.trim();
                  return (
                    <li key={subCategory.name} className="flex items-center pb-4">
                      <span className="text-[0.9rem]">{subCategoryName}</span>
                      <span className="text-[rgba(33,36,61,.8)] tracking-[1.1px] bg-[rgba(65,66,71,.08)] rounded-md ml-2 px-1 text-[0.64rem] font-semibold">
                        {subCategory.count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByCategory;
