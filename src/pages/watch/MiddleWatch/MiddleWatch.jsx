import React from "react";
import CreatePost from "../../HomePage/Home-middle/Post/CreatePost";
import { useState } from "react";
import CreatePostVideo from "./CreatePostVideo/CreatePostVideo";
import Button from "./CreatePostVideo/Button";

const MiddleWatch = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-[1158px]  bg-blue-500 mt-[200px] h-[500px] ml-[360px] overflow-y-auto">
      <div className="w-[822px] ml-[100px] ">
        <Button
          name="Open Modal"
          icon={<i className="fas fa-upload"></i>}
          bg="bg-blue-500"
          onClick={() => setShowModal(true)}
        />
        <CreatePostVideo showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default MiddleWatch;
