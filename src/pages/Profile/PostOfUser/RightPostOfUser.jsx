import { useState } from "react";
import Posted from "../../HomePage/Home-middle/Post/Posted";
import Posts from "../../HomePage/Home-middle/Post/Posts";
import Status from "../../HomePage/Home-middle/Post/Status";
import Options from "./../../HomePage/Home-middle/Post/Options";
import { useParams } from "react-router-dom";

const RightPostOfUser = ({ userId }) => {
  return (
    <div className="ml-3 mt-3">
      <Status />
      <Posted userId={userId} />
    </div>
  );
};

export default RightPostOfUser;
