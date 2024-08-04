import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosHaveAuth } from "../util/axios";
import { useParams } from "react-router-dom";

const MarketContext = createContext();

export const useMarketContext = () => {
  return useContext(MarketContext);
};

export const MarketProvider = ({ children }) => {
  const params = useParams();
  const instance = axiosHaveAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [radius, setRadius] = useState(10);
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("location")) || [0, 0]
  );

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await instance.get(`/api/get/all/market/${radius}`);
        const { products, discounts } = response.data.metadata;

        setProducts(products);
        setDiscounts(discounts);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchMarketData();
  }, [params, radius]);

  const calculateDiscountedPrice = (productVariations, applicableDiscounts) => {
    return productVariations.map((variation) => {
      let originalPrice = variation.price;
      let maxDiscount = 0;

      applicableDiscounts.forEach((disc) => {
        if (originalPrice >= disc.discount_min_order_value) {
          let discountValue = 0;
          if (disc.discount_type === "fixed_amount") {
            discountValue = disc.discount_value;
          } else if (disc.discount_type === "percentage") {
            discountValue = (originalPrice * disc.discount_value) / 100;
          }
          if (discountValue > maxDiscount) {
            maxDiscount = discountValue;
          }
        }
      });

      let discountedPrice = originalPrice - maxDiscount;

      return {
        ...variation,
        price: originalPrice,
        discountedPrice: discountedPrice > 0 ? discountedPrice : 0,
      };
    });
  };

  const getProductsAfterDiscount = () => {
    return products.map((product) => {
      let applicableDiscounts = discounts.filter(
        (disc) =>
          disc.discount_applies_to === "all" ||
          disc.discount_product_ids.includes(product._id)
      );

      let productVariationsWithDiscount = calculateDiscountedPrice(
        product.product_variations,
        applicableDiscounts
      );

      return {
        ...product,
        product_variations: productVariationsWithDiscount,
      };
    });
  };

  const saveAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem("address", newAddress);
  };

  const savePosition = (newPosition) => {
    setPosition(newPosition);
    localStorage.setItem("location", JSON.stringify(newPosition));
  };

  return (
    <MarketContext.Provider
      value={{
        loading,
        products,
        discounts,
        productsAfterDiscount: getProductsAfterDiscount(),
        address,
        setAddress: saveAddress,
        radius,
        setRadius,
        position,
        setPosition: savePosition,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
