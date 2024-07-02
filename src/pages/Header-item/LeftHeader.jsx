import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { WiDirectionLeft } from "react-icons/wi";
import { BsX } from "react-icons/bs";
import useComponentVisible from "../../hooks/useComponentVisible.jsx";

import { useAuthContext } from "../../context/AuthContext.jsx";
import { axiosHaveAuth } from "../../util/axios.js";

const LeftHeader = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const { authUser } = useAuthContext();
  const instance = axiosHaveAuth();

  useEffect(() => {
    if (!searchInput) {
      fetchRecentSearches();
    } else {
      fetchSearchResults();
    }
  }, [searchInput]);

  const fetchRecentSearches = async () => {
    try {
      const response = await instance.get(
        `/api/search-history/${authUser.user._id}`
      );
      setRecentSearches(response.data.metadata);
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await instance.get(
        `/api/search/users?query=${searchInput}`
      );

      setSearchResults(response.data.metadata);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleUserClick = async (searchedUserId) => {
    try {
      await instance.post("/api/search-history", {
        userId: authUser.user._id,
        searchedUserId,
      });
      setSearchInput("");
      setIsComponentVisible(false);
    } catch (error) {
      console.error("Error storing search history:", error);
    }
  };

  const changeButton = async () => {
    setIsComponentVisible(!isComponentVisible);
    if (!isComponentVisible) {
      try {
        const response = await instance.get(
          `/api/search-history/${authUser.user._id}`
        );
        console.log("Check data", response.data.metadata);

        setRecentSearches(response.data.metadata);
      } catch (error) {
        console.error("Error fetching recent searches:", error);
      }
    }
  };

  const handleRemoveUserFromSearch = async (userId) => {
    const body = { userId };
    const response = await instance.post("/api/remove/user/search", body);
    if (response) {
      const newRecentSearch = recentSearches.filter(
        (user) => user._id !== userId
      );
      setRecentSearches(newRecentSearch);
    }
  };

  return (
    <div className="h-full leftheader">
      {!isComponentVisible ? (
        <div className="flex w-[304px] pl-[16px]">
          <Link to={"/"} className="w-[40px] rounded-full">
            <img src="/src/assets/Facebook_Logo_(2019).png" alt="logo" />
          </Link>
          <div className="w-[237px] flex bg-[#F0F2F5] rounded-full pl-3 ml-[7px]">
            <CiSearch className="mt-[13px] text-gray-300 mr-2 text-md " />
            <input
              className="border-none bg-[#F0F2F5] focus:border-transparent focus:outline-none w-13 rounded-full"
              placeholder="Tìm kiếm trên facebook"
              onClick={changeButton}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div
          className="flex w-[304px] h-[505px] bg-white ml-0 flex-col shadow-lg rounded-lg flex-1 leftheader"
          style={{ zIndex: 2 }}
          ref={ref}
        >
          <div className="flex h-[52px] ml-[8px]">
            <div
              className="rounded-full w-[40px] h-[40px] hover:bg-gray-300 items-center justify-center flex"
              onClick={changeButton}
            >
              <WiDirectionLeft className="text-4xl rounded-full" />
            </div>
            <div className="w-[235px] flex bg-[#F0F2F5] rounded-full pl-3 ml-[15px] mb-2 h-[38px]">
              <input
                className="border-none bg-[#F0F2F5] focus:border-transparent focus:outline-none w-13 rounded-full"
                placeholder="Tìm kiếm trên facebook"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between ml-[16px] mr-[16px] mt-[4px]">
            <div className="font-semibold cursor-pointer">Gần đây</div>
            <div className="font-normal text-sm text-blue-600 cursor-pointer">
              Chỉnh sửa
            </div>
          </div>
          {(!searchInput ? recentSearches : searchResults).map((user) => (
            <div
              key={user._id}
              className="box-left-bar-item"
              onClick={() => handleUserClick(user._id)}
            >
              <div className="flex mt-[7px] pr-[16px]">
                <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                  <img
                    className="rounded-full object-cover w-full h-full"
                    src={user.avatar}
                    alt="User Avatar"
                  />
                </div>
                <div className="w-[204px]">
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="font-sm text-current text-xs">
                    {user.email}
                  </div>
                </div>
                <div
                  onClick={() => handleRemoveUserFromSearch(user._id)}
                  className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2"
                >
                  <BsX className="text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftHeader;
