import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FilterProps } from '../../@types/FilterProps';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import useFilterOptionsFromUrl from '../../services/useFilterOptionsFromUrl';
import { getPrice } from '../../api/priceAPI';

const CustomHandle = ({ value, min, max, ...restProps }: any) => {
  const left = ((value - min) / (max - min)) * 100;
  const { prefixCls, dragging, ...filteredProps } = restProps;

  return (
    <>
      <div
        style={{ left: `${left}%` }}
        className="absolute -translate-x-1/2 -translate-y-full mb-2 flex items-center justify-center top-[2px]"
      >
        <span className="text-[#e2a400] text-xs font-semibold p-1">$</span>
        <span className="text-[14px] font-bold">{value}</span>
      </div>
      <div
        {...filteredProps}
        style={{ left: `${left}%` }}
        className="
          absolute 
          h-4 w-4 
          z-[1] 
          bg-gradient-to-b from-white to-[#f5f5fa] 
          rounded-full 
          outline-none 
          transform -translate-x-1/2 -translate-y-1/2 
          shadow-lg 
          border border-yellow-500
          mt-[2px]
        "
      ></div>
    </>
  );
};

const FilterByPrice: React.FC<FilterProps> = ({ title }) => {
  const filterOptions = useFilterOptionsFromUrl();
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(5000);
  const [sliderValue, setSliderValue] = useState<[number, number]>();
  const navigate = useNavigate();


  useEffect(() => {
    const { priceRange, ...otherFilter } = filterOptions;

    const loadPrice = async () => {
      try {
        const { min: newMin, max: newMax } = await getPrice(otherFilter);

        if (newMin !== undefined && newMax !== undefined) {
          setMin(Math.floor(newMin));
          setMax(Math.ceil(newMax));
          setSliderValue([filterOptions.priceRange?.min || min,filterOptions.priceRange?.max || max]);
        }
      } catch (error) {
        console.error('Error fetching price range:', error);
      }
    };

    loadPrice();
  }, [filterOptions,min,max]);

  const onPriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const query = queryString.stringify({ minPrice: value[0], maxPrice: value[1] });
      navigate(`?${query}`, { replace: true });
    }
  };

  return (
    <div className="border-t border-gray-200 pt-8 pb-8">
      <h2 className="text-gray-800 tracking-wide uppercase pb-4 text-xs font-semibold mb-4">{title}</h2>
      <Slider
        range
        min={min}
        max={max}
        value={sliderValue}
        onChange={(value) => setSliderValue(value as [number, number])}
        onChangeComplete={onPriceChange}
        handleRender={(node, props) => <CustomHandle {...props} min={min} max={max} />}
        trackStyle={[{ backgroundColor: '#e2a400', height: '5px' }]}
        railStyle={{ backgroundColor: '#ddd', height: '5px' }}
      />
    </div>
  );
};

export default FilterByPrice;
