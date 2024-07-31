import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosHaveAuth } from "../util/axios";
import { useParams } from "react-router-dom";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [originalAttributes, setOriginalAttributes] = useState([]);
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
          let countBuy = 0;
          product.product_variations.forEach((variation) => {
            const price = variation.price;
            countBuy += variation.orders_count;
            total += price * variation.orders_count;
            if (price > priceMax) priceMax = price;
            if (price < priceMin) priceMin = price;
          });

          return {
            ...product,
            countBuy,
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

    const fetchAttributes = async () => {
      try {
        const response = await instance.get("/api/get/attributes");
        if (response.data.metadata && Array.isArray(response.data.metadata)) {
          const fetchedAttributes = response.data.metadata;
          setAttributes(fetchedAttributes);
          setOriginalAttributes(fetchedAttributes);
        } else {
          setAttributes([]);
          setOriginalAttributes([]);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setAttributes([]);
        setOriginalAttributes([]);
        setLoading(false);
      }
    };

    fetchProduct();
    fetchAttributes();
  }, [params]);

  return (
    <ProductContext.Provider
      value={{
        productData,
        setProductData,
        attributes,
        setAttributes,
        originalAttributes,
        setOriginalAttributes,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
