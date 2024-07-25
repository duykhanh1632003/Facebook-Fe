import React from "react";
import InfoCard from "./InfoCard/InfoCard";
import { FaUserAlt, FaShoppingCart, FaLock } from "react-icons/fa";

const NumberOfProduct = () => {
  return (
    <div className="w-full flex justify-around mt-3">
      <InfoCard
        title="Total Users"
        count={277}
        icon={<FaUserAlt />}
        gradient="linear-gradient(to right, rgb(29, 162, 86), rgb(72, 212, 131))"
      />
      <InfoCard
        title="Total Users"
        count={277}
        icon={<FaShoppingCart />}
        gradient="linear-gradient(to right, rgb(192, 18, 226), rgb(235, 100, 254))"
      />
      <InfoCard
        title="Total Users"
        count={277}
        icon={<FaLock />}
        gradient="linear-gradient(to right, rgba(0, 0, 255, 0.7), rgba(173, 216, 230, 0.7))"
      />
    </div>
  );
};

export default NumberOfProduct;
