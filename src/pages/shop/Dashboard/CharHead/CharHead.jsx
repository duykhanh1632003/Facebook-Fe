import React, { useState } from "react";
import { FaUserFriends, FaShoppingCart, FaStar } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaBagShopping } from "react-icons/fa6";
import { Pie } from "react-chartjs-2";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsArrowClockwise } from "react-icons/bs";
import "./CharHead.css"; // Import custom CSS

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

const CharHead = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [timePeriods, setTimePeriods] = useState(
    new Array(4).fill("Last Month")
  );

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
  };

  const handleTimePeriodChange = (period) => {
    setTimePeriods(
      timePeriods.map((currentPeriod, i) =>
        i === selectedCard ? period : currentPeriod
      )
    );
    handleMenuClose();
  };

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
    {
      color: "bg-gradient-blue",
      icon: <FaBagShopping />,
      text: "Total Users",
    },
    {
      color: "bg-gradient-yellow",
      icon: <FaStar />,
      text: "Total Users",
    },
  ];

  return (
    <div className="h-full flex mt-3">
      <div className="flex flex-wrap justify-center gap-4 h-[358px] w-2/3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} w-[370px] h-[170px] pl-4 pr-4 pt-4 rounded-lg shadow-md flex justify-between text-white`}
          >
            <div>
              <div className="text-xl font-bold">{card.text}</div>
              <div className="text-3xl font-bold">277</div>
              <div className="mt-5">{timePeriods[index]}</div>
            </div>
            <div className="relative">
              <div className="icon-wrapper text-3xl">{card.icon}</div>
              <IconButton
                className="text-white mt-5 ml-3 text-xl cursor-pointer"
                onClick={(event) => handleMenuOpen(event, index)}
              >
                <BsThreeDotsVertical />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleTimePeriodChange("Last Day")}>
                  <BsArrowClockwise className="mr-2" /> Last Day
                </MenuItem>
                <MenuItem onClick={() => handleTimePeriodChange("Last Week")}>
                  <BsArrowClockwise className="mr-2" /> Last Week
                </MenuItem>
                <MenuItem onClick={() => handleTimePeriodChange("Last Month")}>
                  <BsArrowClockwise className="mr-2" /> Last Month
                </MenuItem>
                <MenuItem onClick={() => handleTimePeriodChange("Last Year")}>
                  <BsArrowClockwise className="mr-2" /> Last Year
                </MenuItem>
              </Menu>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-500 w-[370px] h-[365px] p-4 rounded-lg shadow-md text-white">
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

export default CharHead;
