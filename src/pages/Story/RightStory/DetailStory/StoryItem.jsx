const StoryItem = ({ story }) => {
  return (
    <div className="story-item rounded-md">
      {story.type === "image" ? (
        <img src={story.image} alt="story" className="story-image rounded-md" />
      ) : (
        <div className="story-text rounded-md">{story.content}</div>
      )}
      <div className="flex absolute mt-[100px]">
        <div className="w-[303px] h-[42px] bg-black rounded-3xl border-2 border-zinc-50 text-[#ffffff5b] flex items-center p-2">
          Trả lời.....
        </div>
      </div>
    </div>
  );
};

export default StoryItem;
