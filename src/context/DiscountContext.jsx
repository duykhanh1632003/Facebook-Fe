import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosHaveAuth } from "../util/axios";
import { useParams } from "react-router-dom";

const DiscountContext = createContext();

export const useDiscountContext = () => {
  return useContext(DiscountContext);
};

export const DiscountProvider = ({ children }) => {
  const params = useParams();
  const instance = axiosHaveAuth();
  const [dataDiscount, setDataDiscount] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await instance.get("/api/get/allDiscount");
        console.log("Check res", response);
        if (response.data.metadata && Array.isArray(response.data.metadata)) {
          const fetchedAttributes = response.data.metadata;
          setDataDiscount(fetchedAttributes);
        } else {
          setDataDiscount([]);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchDiscount();
  }, [params]);

  return (
    <DiscountContext.Provider value={{ loading, dataDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};
