import { useState } from "react";
import LeftStory from "./LeftStory/LeftStory";
import RightStoriesCreate from "./RightStories/RightStoriesCreate";

const CreateStories = () => {
  const [createImage, setCreatImage] = useState(false);
  const [cancel, setCancel] = useState(false);
  return (
    <div className="flex">
      <div>
        <LeftStory createImage={createImage} cancel={cancel} />
      </div>
      <div>
        <RightStoriesCreate
          setCreatImage={setCreatImage}
          createImage={createImage}
        />
      </div>
    </div>
  );
};

export default CreateStories;
