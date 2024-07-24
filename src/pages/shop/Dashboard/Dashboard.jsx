import React from "react";
import BestSelling from "./BestSelling/BestSelling";
import CharHead from "./CharHead/CharHead";

const Dashboard = () => {
  return (
    <div className="z-1 bg-[#F0F2F5] dark:bg-gray-900">
      <CharHead />
      <BestSelling />
    </div>
  );
};

export default Dashboard;
