import { useState, useEffect } from "react";
import { FaFacebookMessenger, FaChevronDown } from "react-icons/fa";
import { MdPersonAddAlt1, MdPersonRemoveAlt1 } from "react-icons/md";
import { BsPersonCheckFill } from "react-icons/bs";
import { axiosHaveAuth } from "../../../util/axios";
import NavBarOfProfile from "../NavBarOfProfile";
const HeaderProfileAnother = ({ id, friends, numberOfFriends }) => {
  const instance = axiosHaveAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // State to control the dropdown menu

  const [friendStatus, setFriendStatus] = useState("none"); // Possible values: "none", "sent", "friends", "pending"

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await instance.get(`/api/detailUser/user/${id}`);
        console.log("check ress", response);
        setUserDetails(response.data.metadata.userDetails);
        setFriendStatus(response.data.metadata.friendStatus);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSendRequest = () => setFriendStatus("sent");
  const handleCancelRequest = () => setFriendStatus("none");
  const handleAcceptRequest = () => setFriendStatus("friends");
  const handleUnfriend = () => {
    setFriendStatus("none");
    setShowDropdown(false);
  };
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <div>
      <div className="w-[1094px] h-[404px] ml-[212px] rounded-sm relative">
        <img
          className="w-full h-full object-cover items-center justify-center flex rounded-sm"
          src="/src/assets/anh-bia.jpg"
          alt="anh-bia"
        />
        <div className="h-[161px] w-[1030px] flex">
          {/* avt */}
          <div className="ml-[36px] w-[170px] h-[170px] rounded-full absolute mt-[-28px] bg-white border-4 border-transparent">
            <img
              className="w-[169px] h-[169px] rounded-full object-cover"
              src={userDetails?.avatar}
              alt="avt"
            />
          </div>
          <div className="ml-[220px] mt-[28px]">
            <div className="text-3xl font-bold">
              {userDetails?.firstName} {userDetails?.lastName}
            </div>
            <div className="text-[#656770] text-sm font-medium mt-[5px] mb-[5px]">
              {numberOfFriends} bạn bè
            </div>
            <div className="h-[31px] w-[31px] flex">
              <div className="avatar-group-profile">
                {friends?.map((friend) => (
                  <div key={friend.id} className="avatar-profile">
                    <img src={friend.avatar} alt="avatar" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex pl-[200px] mt-[48px]">
            <div className="flex w-[100px] h-[37px] rounded-md bg-[#E4E6EB] justify-center items-center mr-[8px] cursor-pointer">
              <div className="mr-1">
                <FaFacebookMessenger />
              </div>
              <div className="font-medium">Nhắn tin</div>
            </div>
            {friendStatus === "none" && (
              <div
                className="flex w-[129px] h-[37px] rounded-md bg-[#E4E6EB] justify-center items-center cursor-pointer"
                onClick={handleSendRequest}
              >
                <div className="text-xl">
                  <MdPersonAddAlt1 />
                </div>
                <div className="font-medium">Thêm bạn bè</div>
              </div>
            )}
            {friendStatus === "sent" && (
              <div
                className="flex w-[120px] h-[37px] rounded-md bg-[#E4E6EB] justify-center items-center cursor-pointer"
                onClick={handleCancelRequest}
              >
                <div className="text-xl mr-1">
                  <MdPersonRemoveAlt1 />
                </div>
                <div className="font-medium">Hủy lời mời</div>
              </div>
            )}
            {friendStatus === "friends" && (
              <div className="relative">
                <div
                  className="flex w-[95px] h-[37px] rounded-md bg-[#E4E6EB] justify-center items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="text-xl">
                    <BsPersonCheckFill />
                  </div>
                  <div className="font-medium">Bạn bè</div>
                </div>
                {showDropdown && (
                  <div className="absolute top-[45px] left-0 w-[120px] bg-white shadow-md rounded-md">
                    <div
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={handleUnfriend}
                    >
                      Hủy bạn bè
                    </div>
                  </div>
                )}
              </div>
            )}
            {friendStatus === "pending" && (
              <div
                className="flex w-[150px] h-[37px] rounded-md bg-[#E4E6EB] justify-center items-center cursor-pointer"
                onClick={handleAcceptRequest}
              >
                <div className="font-medium">Chấp nhận lời mời</div>
              </div>
            )}
            <div className="ml-[8px] flex w-[50px] h-[37px] rounded-md bg-[#E4E6EB] justify-center items-center cursor-pointer">
              <div className="text-xl">
                <FaChevronDown />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[0.5px] bg-black w-full"></div>
        <NavBarOfProfile />
      </div>
    </div>
  );
};

export default HeaderProfileAnother;
