import React from "react";

const StoryItem = ({ story }) => {
  return (
    <div className="story-item rounded-md">
      {story.type === "image" ? (
        <img src={story.image} alt="story" className="story-image rounded-md" />
      ) : (
        <div className="story-text rounded-md">{story.content}</div>
      )}
    </div>
  );
};

export default StoryItem;
