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
  const [dataDiscount, setDataDiscount] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDiscount = async () => {
        
      try {
        const response  = instance.get("/api/get/all/market")
        
        
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchDiscount();
  }, [params]);

  return (
    <MarketContext.Provider value={{ loading, dataDiscount }}>
      {children}
    </MarketContext.Provider>
  );
};
