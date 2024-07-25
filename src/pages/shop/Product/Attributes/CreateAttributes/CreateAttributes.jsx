import React from "react";
import HeadProduct from "../../HeadProduct/HeadProduct";
import NewAttributes from "./NewAttributes/NewAttributes";

const CreateAttributes = () => {
  return (
    <div className="w-full h-full ml-4 mt-4">
      {" "}
      <HeadProduct name={"Add new Attributes"} />
      <NewAttributes />
    </div>
  );
};

export default CreateAttributes;
