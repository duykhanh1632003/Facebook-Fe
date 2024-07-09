import StoryList from "./DetailStory/StoryList";
import "./Story.css";
const RightStory = ({ user }) => {
  return (
    <div className="h-full w-[1176px] ml-[360px] bg-black">
      <div className=" h-full">
        <StoryList users={user} />
      </div>
    </div>
  );
};

export default RightStory;
