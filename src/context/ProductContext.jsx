import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosHaveAuth } from "../util/axios";
import { useParams } from "react-router-dom";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const instance = axiosHaveAuth();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await instance.get("/api/get/allProduct");

        const products = response.data.metadata.map((product) => {
          let priceMax = 0;
          let priceMin = 1e99;
          let total = 0;
          // Calculate priceMax and priceMin from product_variations
          product.product_variations.forEach((variation) => {
            const price = variation.price;
            total += price * variation.orders_count;
            if (price > priceMax) priceMax = price;
            if (price < priceMin) priceMin = price;
          });

          return {
            ...product,
            priceMax,
            total,
            priceMin,
            status: product.isDraft ? "draft" : "public",
          };
        });

        setProductData(products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params]);

  return (
    <ProductContext.Provider value={{ productData, setProductData, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
