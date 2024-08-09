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
      console.log("cehck response", response);

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

  const truncateName = (name) => {
    return name.length > 15 ? name.substring(0, 15) + "..." : name;
  };

  return (
    <div className="h-full leftheader dark:bg-[#242526]">
      {!isComponentVisible ? (
        <div className="flex w-[304px] pl-[16px]">
          <Link to={"/"} className="w-[40px] rounded-full">
            <img src="/src/assets/Facebook_Logo_(2019).png" alt="logo" />
          </Link>
          <div className="w-[237px] flex bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full pl-3 ml-[7px]">
            <CiSearch className="mt-[13px] text-gray-300 dark:text-gray-400 mr-2 text-md " />
            <input
              className="border-none bg-[#F0F2F5] dark:bg-[#3A3B3C] focus:border-transparent focus:outline-none w-13 rounded-full dark:placeholder-gray-400 dark:text-white"
              placeholder="Tìm kiếm trên facebook"
              onClick={changeButton}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div
          className=" w-[304px] max-h-[505px] bg-white dark:bg-[#242526] ml-0 flex-col shadow-lg rounded-lg flex-1 leftheader"
          style={{ zIndex: 2 }}
          ref={ref}
        >
          {" "}
          <div className="flex  dark:bg-[#242526] ml-0 flex-col shadow-lg rounded-lg flex-1 leftheader">
            <div className="flex h-[52px] ml-[8px] ">
              <div
                className="rounded-full w-[40px] h-[40px] dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-gray-600 items-center justify-center flex"
                onClick={changeButton}
              >
                <WiDirectionLeft className="text-4xl rounded-full dark:text-white" />
              </div>
              <div className="w-[235px] flex  bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full pl-3 ml-[15px] mb-2 h-[38px]">
                <input
                  className="border-none bg-[#F0F2F5] dark:bg-[#3A3B3C] focus:border-transparent focus:outline-none w-13 rounded-full dark:placeholder-gray-400 dark:text-white"
                  placeholder="Tìm kiếm trên facebook"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between ml-[16px] mr-[16px] mt-[4px] dark:text-white dark:bg-[#242526]">
              <div className="font-semibold cursor-pointer">Gần đây</div>
              <div className="font-normal text-sm text-blue-600 cursor-pointer dark:bg-[#242526]">
                Chỉnh sửa
              </div>
            </div>
            {(!searchInput ? recentSearches : searchResults).map((user) => (
              <div
                key={user._id}
                className="box-left-bar-item relative dark:hover:bg-[#3A3B3C]"
                onClick={() => handleUserClick(user._id)}
              >
                <div className="flex mt-[7px] pr-[16px]">
                  <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center">
                    <img
                      className="rounded-full object-cover w-full h-full"
                      src={user.avatar}
                      alt="User Avatar"
                    />
                  </div>
                  <div className="w-[204px] dark:text-white">
                    <div className="font-medium text-sm">
                      {truncateName(user.firstName + " " + user.lastName)}{" "}
                    </div>
                    <div className="font-sm text-current text-xs">
                      {user.email}
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên thẻ cha
                      handleRemoveUserFromSearch(user._id);
                    }}
                    className="flex items-center absolute justify-center right-3 w-[25px] h-[25px] dark:hover:bg-black hover:rounded-full mt-2 z-[6] cursor-pointer"
                  >
                    <BsX className="text-2xl dark:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftHeader;
