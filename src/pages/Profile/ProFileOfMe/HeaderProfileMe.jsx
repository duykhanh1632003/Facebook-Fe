import { useEffect, useState } from "react";
import { FaChevronDown, FaPen } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { useAuthContext } from "../../../context/AuthContext";
import AvatarEditModal from "./AvatarEditModal"; // Import modal component
import { PiUserSquare } from "react-icons/pi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import NavBarOfProfile from "../NavBarOfProfile";
import { axiosHaveAuth } from "../../../util/axios";

const HeaderProfileMe = ({ id }) => {
  const { authUser } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false); // State to control the dropdown menu
  const [showAvatarModal, setShowAvatarModal] = useState(false); // State to control avatar edit modal
  const [numberOfFriends, setNumberOfFriends] = useState(0);
  const [friends, setFriends] = useState([]);
  const instance = axiosHaveAuth();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleEditAvatarClick = () => {
    setShowDropdown(false);
    setShowAvatarModal(true);
  };

  useEffect(() => {
    const fetchNumberOfFriends = async () => {
      try {
        const response = await instance.get(
          `/api/number/friend/${authUser.user._id}`
        );
        console.log("Check data", response);
        setNumberOfFriends(response.data.metadata.numberOfFriends);
        setFriends(response.data.metadata.friends.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch number of friends", error);
      }
    };
    fetchNumberOfFriends();
  }, [authUser.user._id]);

  return (
    <div>
      <div className="w-[1094px] bg-white h-[404px] ml-[212px] rounded-sm relative">
        <div className="w-[1096px] bg-white h-[406px] relative">
          <img
            className="w-full bg-white h-full object-cover items-center flex rounded-sm"
            src="/src/assets/anh-bia.jpg"
            alt="anh-bia"
          />
          <div className="absolute bg-white w-[160px] ml-[900px] rounded-md h-[36px] bg-[#FFFFFF] hover:bg-[#fffffff1] mt-[-50px] justify-center flex items-center cursor-pointer">
            <div className="text-lg mr-1">
              <IoCamera />
            </div>
            <div className="font-medium bg-white text-sm">
              Chỉnh sửa ảnh bìa
            </div>
          </div>
        </div>
        <div className="h-[161px] w-[1030px] flex bg-white">
          {/* Avatar */}
          <div
            onClick={toggleDropdown}
            className="ml-[36px] w-[170px] h-[170px] rounded-full absolute mt-[-28px] bg-white border-4 border-transparent cursor-pointer"
          >
            <div className="absolute w-[40px] h-[40px] bg-[#E4E6EB] flex items-center justify-center rounded-full mt-[120px] ml-[120px] cursor-pointer">
              <IoCamera className="text-3xl" />
            </div>
            <img
              className="w-[169px] h-[169px] rounded-full object-cover"
              src={authUser.user.avatar}
              alt="avatar"
            />
            {showDropdown && (
              <div className="absolute top-[160px] ml-[-170px] w-[347px] h-[88px] left-[120px] bg-white border shadow-lg rounded-md z-10">
                <div
                  className="p-2 flex items-center justify-normal cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    (window.location.href = `/photos/${authUser.user.avatarId}`)
                  }
                >
                  <div className="mr-1 text-2xl">
                    <PiUserSquare />
                  </div>
                  <div className="font-medium">Xem ảnh đại diện</div>
                </div>
                <div
                  className="p-2 cursor-pointer flex hover:bg-gray-200"
                  onClick={handleEditAvatarClick}
                >
                  <div className="mr-1 text-2xl">
                    <MdOutlinePhotoLibrary />
                  </div>
                  <div className="font-medium">Chọn ảnh đại diện</div>
                </div>
              </div>
            )}
          </div>
          <div className="ml-[220px] mt-[28px]">
            <div className="text-3xl font-bold">
              {authUser.user.firstName} {authUser.user.lastName}
            </div>
            <div className="text-[#656770] bg-white text-sm font-medium mt-[5px] mb-[5px]">
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
          <div className="flex mt-[48px] ml-[200px] bg-white">
            <div className="ml-[8px] flex w-[128px] h-[37px] rounded-md bg-[#0861F2] hover:bg-[#065ff0] justify-center items-center cursor-pointer">
              <div className="text-lg mr-1 text-white">
                <IoMdAdd />
              </div>
              <div className="font-medium text-white">Thêm vào tin</div>
            </div>
            <div className="ml-[8px] flex w-[220px] h-[37px] rounded-md bg-[#E4E6EB] hover:bg-[#d2d7e4] justify-center items-center cursor-pointer">
              <div className="text-lg mr-1">
                <FaPen />
              </div>
              <div className="font-medium">Chỉnh sửa trang cá nhân</div>
            </div>
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

      {/* Avatar Edit Modal */}
      {showAvatarModal && (
        <AvatarEditModal
          show={showAvatarModal}
          onHide={() => setShowAvatarModal(false)}
        />
      )}
    </div>
  );
};

export default HeaderProfileMe;
