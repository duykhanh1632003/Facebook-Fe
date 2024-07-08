import { useState } from "react";
import StoryList from "./DetailStory/StoryList";
import "./Story.css";
const RightStory = () => {
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
        // {
        //   storyId: "story2",
        //   type: "text",
        //   content: "Some text content",
        //   createdAt: "2024-07-07T12:45:00.000Z",
        // },
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
  return (
    <div className="h-full w-[1176px] ml-[360px] bg-black">
      <div className=" h-full">
        <StoryList users={user} />
      </div>
    </div>
  );
};

export default RightStory;
