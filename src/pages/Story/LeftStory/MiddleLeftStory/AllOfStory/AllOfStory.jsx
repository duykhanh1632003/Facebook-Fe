import React from "react";
import { useActiveUserContext } from "../../../../../context/StoryContext";

const AllOfStory = ({ user }) => {
  const { setActiveUserIndex } = useActiveUserContext();

  return (
    <div>
      <div className="font-medium ml-2 overflow-y-auto">Tất cả tin</div>
      {user?.map((userData, index) => (
        <div
          key={userData.userId}
          className="flex flex-col h-[78px] w-[327px] rounded-lg bg-red-200 justify-center pl-2 mb-2 cursor-pointer"
          onClick={() => setActiveUserIndex(index)}
        >
          <div className="flex">
            <div className="w-[62px] h-[62px] rounded-full p-1 bg-[#CED0D4]">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                <img
                  className="w-[47px] h-[47px] rounded-full object-cover"
                  src={userData.avatar}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="ml-2 pt-2">
              <div className="font-medium text-md">{userData.userName}</div>
              {userData.stories.length > 0 && (
                <div className="text-sm">
                  {new Date(userData.stories[0].createdAt).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="h-[100px]"></div>
    </div>
  );
};

export default AllOfStory;
