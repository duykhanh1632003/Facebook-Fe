import React from "react";

const StoryItem = ({ story }) => {
  return (
    <div className="story-item">
      {story.type === "image" ? (
        <img src={story.content} alt="story" className="story-image" />
      ) : (
        <div className="story-text">{story.content}</div>
      )}
    </div>
  );
};

export default StoryItem;
