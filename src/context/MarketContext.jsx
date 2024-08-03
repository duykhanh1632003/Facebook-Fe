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
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [radius, setRadius] = useState(10);
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("location")) || [0, 0]
  );

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await instance.get(`/api/get/all/market/${radius}`);
        console.log("Check res", response);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchDiscount();
  }, [params, radius]);

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
