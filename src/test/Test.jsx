import { useState } from "react";
import "./Test.css";
import StoryList from "./components/StoryList";
const Test = () => {
  const [user, setUser] = useState([
    {
      userId: "user1",
      userName: "User One",
      avatar: "avatar_url_1",
      stories: [
        {
          storyId: "story1",
          type: "image",
          content: "image_url_1",
          createdAt: "2024-07-07T12:34:56.000Z",
        },
        {
          storyId: "story2",
          type: "text",
          content: "Some text content",
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
          content: "image_url_2",
          createdAt: "2024-07-07T13:00:00.000Z",
        },
      ],
    },
  ]);
  return (
    <div className="form-group">
      <header className="App-header">
        <h1>Story Feature</h1>
      </header>
      <StoryList users={user} />
    </div>
  );
};

export default Test;
