import React from "react";
import { FaUserFriends, FaShoppingCart, FaStar } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaBagShopping } from "react-icons/fa6";
import { Pie } from "react-chartjs-2";
import "./Dashboard.css"; // Import custom CSS

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["2013", "2014", "2015", "2016"],
  datasets: [
    {
      label: "# of Votes",
      data: [25.9, 30.3, 17.1, 26.7],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  const cards = [
    {
      color: "bg-gradient-green",
      icon: <FaUserFriends />,
      text: "Total Users",
    },
    {
      color: "bg-gradient-pink",
      icon: <FaShoppingCart />,
      text: "Total Users",
    },
    { color: "bg-gradient-blue", icon: <FaBagShopping />, text: "Total Users" },
    { color: "bg-gradient-yellow", icon: <FaStar />, text: "Total Users" },
  ];

  return (
    <div className="bg-white h-full w-full flex mt-3">
      <div className="flex flex-wrap justify-center gap-4 h-[358px] w-2/3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} w-[370px] h-[170px] p-4 rounded-lg shadow-md flex items-center justify-between text-white`}
          >
            <div>
              <div className="text-xl font-bold">{card.text}</div>
              <div className="text-3xl font-bold">277</div>
              <div>Last Month</div>
            </div>
            <div className="icon-wrapper text-3xl">{card.icon}</div>
          </div>
        ))}
      </div>
      <div className="bg-blue-500 w-[370px] h-[358px] p-4 rounded-lg shadow-md text-white">
        <div className="text-xl font-bold">Total Sales</div>
        <div className="text-3xl font-bold">$3,787,681.00</div>
        <div>$3,578.90 in last month</div>
        <div className="h-[230px] w-[230px]">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
