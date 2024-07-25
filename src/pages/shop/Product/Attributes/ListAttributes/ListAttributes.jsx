import React from "react";
import HeadProduct from "../../HeadProduct/HeadProduct";
import TableAttributes from "./TableAttributes/TableAttributes";

const ListAttributes = () => {
  return (
    <div className="w-full h-full ml-4 mt-4">
      <HeadProduct name={"Attribute"} />
      <TableAttributes />
    </div>
  );
};

export default ListAttributes;
