import { useContext, useState } from "react";
import LeftStory from "./LeftStory/LeftStory";
import RightStoriesCreate from "./RightStories/RightStoriesCreate";

const CreateStories = () => {
  const [createImage, setCreatImage] = useState(false);
  const [buttonCreateImage, setButtonCreateImage] = useState(false);
  const [buttonCreateText, setButtonCreateText] = useState(false);
  const [rightImageCrop, setRightImageCrop] = useState(false);
  const [backGroundStr, setBackGroundStr] = useState(null);
  const [cancel, setCancel] = useState(false);
  return (
    <div className="flex">
      <div>
        <LeftStory createImage={createImage} cancel={cancel} />
      </div>
      <div className="h-screen w-full">
        <RightStoriesCreate
          setCreatImage={setCreatImage}
          createImage={createImage}
          buttonCreateImage={buttonCreateImage}
          setButtonCreateImage={setButtonCreateImage}
          buttonCreateText={buttonCreateText}
          setButtonCreateText={setButtonCreateText}
          cancel={cancel}
          setCancel={setCancel}
          rightImageCrop={rightImageCrop}
        />
      </div>
    </div>
  );
};

export default CreateStories;
