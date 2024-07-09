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
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
      stories: [
        {
          storyId: "story1",
          type: "image",
          image:
            "https://www.shutterstock.com/image-photo/happy-puppy-welsh-corgi-14-600nw-2270841247.jpg",
          createdAt: "2024-07-07T12:34:56.000Z",
        },
        {
          storyId: "story2",
          type: "image",
          image:
            "https://www.shutterstock.com/image-photo/happy-puppy-welsh-corgi-14-600nw-2270841247.jpg",
          createdAt: "2024-07-07T12:34:56.000Z",
        },
        {
          storyId: "story3",
          type: "image",
          image:
            "https://www.shutterstock.com/image-photo/happy-puppy-welsh-corgi-14-600nw-2270841247.jpg",
          createdAt: "2024-07-07T12:34:56.000Z",
        },
        {
          storyId: "story5",
          type: "text",
          text: "Some text content",
          backGround: 2,
          font: 3,
          createdAt: "2024-07-07T12:45:00.000Z",
        },
      ],
    },
    {
      userId: "user2",
      userName: "User Two",
      avatar: "avatar_url_2",
      stories: [
        {
          storyId: "story3",
          type: "image",
          image:
            "https://www.shutterstock.com/image-photo/happy-puppy-welsh-corgi-14-600nw-2270841247.jpg",
          createdAt: "2024-07-07T13:00:00.000Z",
        },
      ],
    },
  ]);
  useEffect(() => {
    const fetchNumberOfFriends = async () => {
      try {
        const response = await instance.get("/api/stories");
        console.log("check ré", response);
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
      <LeftStory />
      <RightStory user={user} />
    </div>
  );
};

export default StoryContainer;
