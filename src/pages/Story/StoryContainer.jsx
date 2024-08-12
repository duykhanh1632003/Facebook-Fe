import { useActiveUserContext } from "../../context/StoryContext";
import { axiosHaveAuth } from "../../util/axios";
import LeftStory from "./LeftStory/LeftStory";
import RightStory from "./RightStory/RightStory";
import { useEffect, useState } from "react";

const StoryContainer = () => {
  const instance = axiosHaveAuth(); 

  const [user, setUser] = useState([
    {
      userId: "user1",
      userName: "User One",
      avatar:
        "https://ongnhuahdpevietnam.com/wp-content/uploads/2022/08/anh-nen-den-cho-dien-thoai.jpg",
      stories: [
        {
          storyId: "story1",
          type: "image",
          image:
            "https://ongnhuahdpevietnam.com/wp-content/uploads/2022/08/anh-nen-den-cho-dien-thoai.jpg",
          createdAt: "2024-07-07T12:34:56.000Z",
        },
      ],
    },
  ]);

  const { activeUserIndex } = useActiveUserContext();

  useEffect(() => {
    const fetchNumberOfFriends = async () => {
      try {
        const response = await instance.get("/api/stories");
        if (!response) {
          return;
        }
        setUser(response.data.metadata);
      } catch (error) {
        console.error("Failed to fetch number of friends", error);
      }
    };
    fetchNumberOfFriends();
  }, []);
  return (
    <div className="h-screen w-full bg-white">
      <LeftStory user={user} />
      <RightStory user={user} activeUserIndex={activeUserIndex} />
    </div>
  );
};

export default StoryContainer;
