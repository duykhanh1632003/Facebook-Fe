import { backGroundImageStr, fontFamily } from "../../../../util/background";

const StoryItem = ({ story }) => {
  const fontFamilies = fontFamily();
  const backGroundImages = backGroundImageStr();

  return (
    <div className="story-item rounded-md">
      {story.type === "image" ? (
        <img src={story.image} alt="story" className="story-image rounded-md" />
      ) : (
        <div
          className="story-text rounded-md h-full  flex items-center justify-center font-medium text-xl p-4"
          style={{
            background: backGroundImages[story.backGround - 1].image,
            color: backGroundImages[story.backGround - 1].color,
            fontFamily: fontFamilies[story.font - 1].fontFamily,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {story.text}
        </div>
      )}
    </div>
  );
};

export default StoryItem;
