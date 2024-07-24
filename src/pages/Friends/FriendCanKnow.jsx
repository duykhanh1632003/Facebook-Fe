// FriendCanKnow.js
import { useEffect, useState } from "react";
import "./FriendCanKnow.css";
import { axiosHaveAuth } from "../../util/axios";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FriendCanKnow = () => {
  const instance = axiosHaveAuth();
  const [friendCanKnow, setFriendCanKnow] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    instance
      .get("/api/friend/canKnow", {
        params: { userId: authUser.user._id },
      })
      .then((res) => {
        console.log(res.data.metadata);
        setFriendCanKnow(res.data.metadata);
      });
  }, []);

  const sendFriendRequest = (receiverId) => {
    instance
      .post("/api/friend/request", { senderId: authUser.user._id, receiverId })
      .then(() => {
        setSentRequests((prev) => [...prev, receiverId]);
      });
  };

  const cancelFriendRequest = (receiverId) => {
    instance
      .post("/api/friend/cancelRequest", {
        senderId: authUser.user._id,
        receiverId,
      })
      .then(() => {
        setSentRequests((prev) => prev.filter((id) => id !== receiverId));
      });
  };

  const navigate = useNavigate();
  const handleToLink = (id) => {
    navigate(`/profile/${id}`);
  };

  const [visibleCount, setVisibleCount] = useState(10);

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="flex flex-wrap pt-2 ml-7 justify-start overflow-y-auto !z-1 dark:bg-[#1A1A1A]">
      {friendCanKnow?.slice(0, visibleCount).map((request) => (
        <div
          key={request.nonFriend._id}
          className="h-[361px] w-[210px] bg-[#F9F9F9] dark:bg-[#333] rounded-lg m-[5px] shadow-lg"
        >
          <div
            onClick={() => handleToLink(request.nonFriend._id)}
            className="h-[210px] w-full object-fill rounded-lg cursor-pointer"
          >
            <img
              className="rounded-lg object-cover w-full h-full"
              src={request.nonFriend.avatar}
              alt="Profile"
            />
          </div>
          <div
            onClick={() => handleToLink(request.nonFriend._id)}
            className="pt-[5px] pl-[12px] pr-[12px] font-medium text-md hover:underline cursor-pointer dark:text-white"
          >
            {request.nonFriend.firstName} {request.nonFriend.lastName}
          </div>
          {!sentRequests.includes(request.nonFriend._id) && (
            <>
              <div className="flex items-center ml-2 mr-2">
                <div className="flex">
                  {request.mutualFriends.slice(0, 2).map((friend, index) => (
                    <div key={index} className="avatar h-[16px] w-[12px]">
                      <img
                        src={friend.avatar}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-[#657374] dark:text-[#A8A8A8]">
                  {request.mutualFriends.length} bạn chung
                </div>
              </div>
              <div
                className="h-[36px] w-[186px] bg-[#DFE9F2] text-[#0067D0] hover:bg-[#d1dce6] ml-2 mt-[7px] rounded-md flex items-center justify-center font-medium cursor-pointer"
                onClick={() => sendFriendRequest(request.nonFriend._id)}
              >
                Thêm bạn bè
              </div>
            </>
          )}
          {sentRequests.includes(request.nonFriend._id) ? (
            <div
              className="h-[36px] mt-[72px] w-[186px] bg-[#E4E6EB] dark:bg-[#3A3B3C] ml-2 mt-[7px] rounded-md flex items-center justify-center font-medium cursor-pointer hover:bg-[#E4E6EB] dark:hover:bg-[#5A5A5A]"
              onClick={() => cancelFriendRequest(request.nonFriend._id)}
            >
              Hủy lời mời
            </div>
          ) : (
            <div className="h-[36px] w-[186px] bg-[#E4E6EB] dark:bg-[#3A3B3C] ml-2 mt-[7px] rounded-md flex items-center justify-center font-medium cursor-pointer hover:bg-[#E4E6EB] dark:hover:bg-[#5A5A5A]">
              Xóa
            </div>
          )}
        </div>
      ))}
      {visibleCount < (friendCanKnow?.length || 0) && (
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

export default FriendCanKnow;
