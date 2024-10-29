import React from "react";
import { Product } from "../@types/Product";
import star from "../assets/icons/star.svg";

interface ProductItemProps {
  item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <li className="basis-1/4 text-[#21243d] text-[14px] leading-[18px]">
      <div className="h-[174px] w-[174px] flex items-center justify-center m-auto">
        <img src={item.image} alt={item.name} className="h-auto max-h-full max-w-full" />
      </div>
      <div className="break-words">
        <p className="opacity-70 uppercase mb-2 text-xs font-semibold leading-none">{item.categories[0]}</p>
        <h2 className="font-bold">
          <span>{item.name}</span>
        </h2>
        <div className="relative group">
          <p className="mt-1 line-clamp-2 cursor-pointer">
            <span>{item.description}</span>
          </p>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 w-64 p-2 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {item.description}
          </span>
        </div>
        <p className="flex items-center my-[14px]">
          <span className="text-[#e2a400] text-[11px] font-semibold mr-1">$</span>
          <strong>{item.price}</strong>
          <span className="border border-[rgba(226,164,0,0.5)] rounded-[4px] ml-1 px-1 flex justify-between text-[#e2a400]">
            <img src={star} className="mr-1" alt="image-star" />
            <span>{item.rating}</span>
          </span>
        </p>
      </div>
    </li>
  );
};

export default ProductItem;
