import React from "react";
import LeftStory from "./LeftStory/LeftStory";
import RightStoriesCreate from "./RightStories/RightStoriesCreate";
import { StoriesProvider } from "../../../../context/StoriesContext";

const CreateStories = () => {
  return (
    <StoriesProvider>
      <div className="flex">
        <div>
          <LeftStory />
        </div>
        <div className="h-screen w-full">
          <RightStoriesCreate />
        </div>
      </div>
    </StoriesProvider>
  );
};

export default CreateStories;
