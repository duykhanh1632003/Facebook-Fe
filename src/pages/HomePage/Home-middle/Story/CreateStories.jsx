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
  const [nameValueBg, setNameValueBg] = useState(1);
  const [nameValueFont, setNameValueFont] = useState(1);
  const [valueInput, setValueInput] = useState("");

  return (
    <div className="flex">
      <div>
        <LeftStory
          setValueInput={setValueInput}
          createImage={createImage}
          cancel={cancel}
          nameValueBg={nameValueBg}
          setNameValueBg={setNameValueBg}
          setNameValueFont={setNameValueFont}
        />
      </div>
      <div className="h-screen w-full">
        <RightStoriesCreate
          nameValueBg={nameValueBg}
          nameValueFont={nameValueFont}
          setCreatImage={setCreatImage}
          createImage={createImage}
          buttonCreateImage={buttonCreateImage}
          setButtonCreateImage={setButtonCreateImage}
          buttonCreateText={buttonCreateText}
          setButtonCreateText={setButtonCreateText}
          cancel={cancel}
          setCancel={setCancel}
          rightImageCrop={rightImageCrop}
          valueInput={valueInput}
        />
      </div>
    </div>
  );
};

export default CreateStories;
