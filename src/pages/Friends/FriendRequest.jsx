// FriendRequest.js
import React, { useEffect, useState } from "react";
import "./FriendRequest.css";
import { axiosHaveAuth } from "../../util/axios";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FriendRequest = () => {
  const navigate = useNavigate();

  const instance = axiosHaveAuth();
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const { authUser } = useAuthContext();

  const handleOnClick = (userId) => {
    navigate(`/profile/${userId}`);
  };
  useEffect(() => {
    instance
      .get("/api/friend/requests", { params: { userId: authUser.user._id } })
      .then((res) => {
        console.log("Check res", res.data);
        setFriendRequests(res.data.metadata);
      });
  }, []);

  const acceptFriendRequest = (senderId) => {
    instance
      .post("/api/friend/acceptRequest", {
        userId: authUser.user._id,
        senderId,
      })
      .then(() => {
        setAcceptedRequests((prev) => [...prev, senderId]);
      });
  };

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <div className="flex flex-wrap pt-2 ml-7 justify-start overflow-y-auto dark:bg-[#1A1A1A]">
      {friendRequests.slice(0, visibleCount).map((request) => (
        <div
          key={request.sender._id}
          onClick={() => handleOnClick(request.sender._id)}
          className="h-[361px] w-[210px] bg-[#F9F9F9] dark:bg-[#333] rounded-lg m-[5px] shadow-lg"
        >
          <div className="h-[210px] w-full object-fill rounded-lg cursor-pointer">
            <img
              className="rounded-lg h-full w-full object-cover"
              src={request.sender.avatar}
              alt="Profile"
            />
          </div>
          <div className="pt-[5px] pl-[12px] pr-[12px] font-medium text-md hover:underline cursor-pointer dark:text-white">
            {request.sender.firstName.length + request.sender.lastName.length >
            16
              ? request.sender.firstName +
                " " +
                request.sender.lastName.slice(
                  0,
                  16 - request.sender.firstName.length
                )
              : request.sender.firstName + request.sender.lastName}
          </div>
          <div className="flex items-center ml-4 ">
            <div className="h-[16px] w-[24px] flex">
              <div className="avatar-group">
                {request.mutualFriends.slice(0, 2).map((friend, index) => (
                  <div key={index} className="avatar">
                    <img src={friend.avatar} alt="Avatar" />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[#657374] ml-1 dark:text-[#A8A8A8]">
              {request.mutualFriends.length} bạn chung
            </div>
          </div>
          {!acceptedRequests.includes(request.sender._id) && (
            <>
              <div
                className="h-[36px] w-[186px] bg-[#0866FF] ml-2 mt-[7px] rounded-md flex items-center justify-center font-medium text-white cursor-pointer"
                onClick={() => acceptFriendRequest(request.sender._id)}
              >
                Xác nhận
              </div>
              <div className="h-[36px] w-[186px] bg-[#E4E6EB] dark:bg-[#3A3B3C] ml-2 mt-[7px] rounded-md flex items-center justify-center font-medium cursor-pointer hover:bg-[#d1d5e0] dark:hover:bg-[#5A5A5A]">
                Xóa
              </div>
            </>
          )}
          {acceptedRequests.includes(request.sender._id) && (
            <div className="h-[36px] w-[186px] bg-[#E4E6EB] dark:bg-[#3A3B3C] ml-2 mt-[51px] rounded-md flex items-center justify-center font-medium cursor-pointer dark:text-white">
              Đã chấp nhận
            </div>
          )}
        </div>
      ))}
      {visibleCount < friendRequests.length && (
        <div className="w-full flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
            onClick={showMore}
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
