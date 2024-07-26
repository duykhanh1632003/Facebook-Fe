import HeadProduct from "../HeadProduct/HeadProduct";
import CreateProduct from "./CreateProduct/CreateProduct";

const ProductUpload = () => {
  return (
    <div className="w-[1166px] ml-4 mt-4  ">
      <HeadProduct name={"Upload product"} />
      <CreateProduct />
    </div>
  );
};

export default ProductUpload;
