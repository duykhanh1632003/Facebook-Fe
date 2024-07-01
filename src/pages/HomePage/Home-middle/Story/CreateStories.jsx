import { useContext, useState } from "react";
import LeftStory from "./LeftStory/LeftStory";
import RightStoriesCreate from "./RightStories/RightStoriesCreate";

const CreateStories = () => {
  const [createImage, setCreatImage] = useState(false);
  const [buttonCreateImageText, setButtonCreateImageText] = useState(true);
  const [rightImageCrop, setRightImageCrop] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [nameValueBg, setNameValueBg] = useState(1);
  const [nameValueFont, setNameValueFont] = useState(1);
  const [valueInput, setValueInput] = useState("");
  const [leftTextStr, setLeftTextStr] = useState(false);

  const [ham, setHam] = useState(false);
  return (
    <div className="flex">
      <div>
        <LeftStory
          leftTextStr={leftTextStr}
          setLeftTextStr={setLeftTextStr}
          setValueInput={setValueInput}
          createImage={createImage}
          cancel={cancel}
          setCancel={setCancel}
          nameValueBg={nameValueBg}
          setNameValueBg={setNameValueBg}
          setNameValueFont={setNameValueFont}
          setHam={setHam}
          setRightImageCrop={setRightImageCrop}
          setButtonCreateImageText={setButtonCreateImageText}
        />
      </div>
      <div className="h-screen w-full">
        <RightStoriesCreate
          nameValueBg={nameValueBg}
          nameValueFont={nameValueFont}
          setCreatImage={setCreatImage}
          createImage={createImage}
          buttonCreateImageText={buttonCreateImageText}
          setButtonCreateImageText={setButtonCreateImageText}
          cancel={cancel}
          setCancel={setCancel}
          rightImageCrop={rightImageCrop}
          valueInput={valueInput}
          leftTextStr={leftTextStr}
          setRightImageCrop={setRightImageCrop}
          ham={ham}
          setLeftTextStr={setLeftTextStr}
        />
      </div>
    </div>
  );
};

export default CreateStories;
