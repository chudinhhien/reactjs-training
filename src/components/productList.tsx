import { useEffect, useState } from "react";
import { Product } from "../@types/Product";
import { getProducts } from "../api/productAPI";
import ProductItem from "./productItem";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { category } = useParams<{category: string}>();
  const { t } = useTranslation();

  useEffect(() => {
    async function loadProduct() {
      const data = await getProducts(category as string);
      setProducts(data);
    }
    loadProduct();
  }, [category]);

  return (
    <>
      <div className="max-w-[1300px] mx-auto p-8 flex">
        {products.length === 0 ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <p className="text-lg text-gray-500">{t('alert.not_found')}</p>
          </div>
        ) : (
          <ul className="flex flex-wrap">
            {products.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProductList;
