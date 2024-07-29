import React from "react";
import HeadProduct from "../../Product/HeadProduct/HeadProduct";
import TableDiscount from "./TableDiscount/TableDiscount";

const ListDiscount = () => {
  return (
    <div className="ml-4 mt-4 w-full h-full">
      {" "}
      <HeadProduct name={"Add new Attributes"} />
      <TableDiscount />
    </div>
  );
};

export default ListDiscount;
