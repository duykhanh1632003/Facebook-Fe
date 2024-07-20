import React from "react";
import LeftRecs from "./LeftRecs/LeftRecs";
import RightRecs from "./RightRecs/RightRecs";

const Recs = () => {
  return (
    <div className="w-full bg-black h-screen flex">
      <LeftRecs />
      <RightRecs />
    </div>
  );
};

export default Recs;
