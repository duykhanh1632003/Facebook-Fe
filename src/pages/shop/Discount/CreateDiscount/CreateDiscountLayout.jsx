import React from "react";
import HeadProduct from "../../Product/HeadProduct/HeadProduct";
import CreateDiscount from "./CreateDiscount/CreateDiscount";

const CreateDiscountLayout = () => {
  return (
    <div className="ml-4 mt-4 w-full">
      {" "}
      <HeadProduct name={"Add new discount"} />
      <CreateDiscount />
    </div>
  );
};

export default CreateDiscountLayout;
