import HeadProduct from "../HeadProduct/HeadProduct";
import NumberOfProduct from "./NumberOfProduct/NumberOfProduct";
import TableProduct from "./TableProduct/TableProduct";

const ProductList = () => {
  return (
    <div className="w-[1166px] ml-4 mt-4  ">
      <HeadProduct />
      <NumberOfProduct />
      <TableProduct />
    </div>
  );
};

export default ProductList;
