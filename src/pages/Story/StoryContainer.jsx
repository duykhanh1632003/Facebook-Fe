import LeftStory from "./LeftStory/LeftStory";
import RightStory from "./RightStory/RightStory";

const StoryContainer = () => {
  return (
    <div className="h-screen w-full bg-white">
      <LeftStory />
      <RightStory />
    </div>
  );
};

export default StoryContainer;
