import { useEffect, useState } from "react";
import { FilterProps } from "../../@types/FilterProps";
import { getCategories, getSubCategories } from "../../api/categoryAPI";
import { Category } from "../../@types/Category";
import { useNavigate, useParams } from "react-router-dom";
import triangleDown from "../../assets/icons/triangleDown.svg"
import triangleUp from "../../assets/icons/triangleUp.svg"

const FilterByCategory: React.FC<FilterProps> = ({ title }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<{ [key: string]: Category[] }>({});
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const formatSubCategory = (data: Category[]) => {
    return data.map(item => {
      const subCategoryName = item.name.split('>').pop()?.trim() || '';
      return {
        ...item,
        name: subCategoryName,
      };
    });
  };

  const handleFilter = async (categoryName: string) => {
    navigate(`/${categoryName}`);
    
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
      if (!subCategories[categoryName]) {
        let data = await getSubCategories(categoryName);
        const formattedData = formatSubCategory(data).sort((a,b) => 
          a.name.localeCompare(b.name)
        );
        setSubCategories(prev => ({ ...prev, [categoryName]: formattedData }));
      }
    }
  };

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      const sortedCategories = data.sort((a,b) => 
        a.name.localeCompare(b.name)
      )
      setCategories(sortedCategories);
    }
    loadCategories();
  }, [])

  return (
    <>
      <div className="border-t border-[#ebecf3] pt-8 pb-8">
        <h2 className="text-[#21243d] tracking-[.08rem] uppercase border-none pb-4 text-[0.678rem] font-semibold">{title}</h2>
        <ul>
          {categories.map((item, index) => (
            <li key={index} className="pb-4">
              <div
                onClick={() => handleFilter(item.name)}
                className={`flex items-center cursor-pointer ${item.name === category ? "font-bold" : ""}`}
              >
                <span className="mr-2">{expandedCategory === item.name ? <img src={triangleDown} alt="icon-down" className="h-2 w-2"/> : <img src={triangleUp} alt="icon-up" className="h-2 w-2"/>}</span>
                <span className="text-[0.9rem]">{item.name}</span>
                <span className="text-[rgba(33,36,61,.8)] tracking-[1.1px] bg-[rgba(65,66,71,.08)] rounded-md flex items-center ml-2 px-1 text-[0.64rem] font-semibold">{item.count}</span>
              </div>
              {expandedCategory === item.name && subCategories[item.name]?.length > 0 && (
                <ul className="pl-6 mt-2 text-gray-500">
                  {subCategories[item.name].map((sub, subIndex) => (
                    <li key={subIndex} className="flex items-center pb-4">
                      <span className="text-[0.9rem]">{sub.name}</span>
                      <span className="text-[rgba(33,36,61,.8)] tracking-[1.1px] bg-[rgba(65,66,71,.08)] rounded-md flex items-center ml-2 px-1 text-[0.64rem] font-semibold">{sub.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FilterByCategory;
