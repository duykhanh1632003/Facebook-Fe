import { useState } from "react";
import LeftStory from "./LeftStory/LeftStory";
import RightStoriesCreate from "./RightStories/RightStoriesCreate";

const CreateStories = () => {
  const [createImage, setCreatImage] = useState(false);
  const [buttonCreateImage, setButtonCreateImage] = useState(false);
  const [buttonCreateText, setButtonCreateText] = useState(false);
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
        />
      </div>
    </div>
  );
};

export default CreateStories;
