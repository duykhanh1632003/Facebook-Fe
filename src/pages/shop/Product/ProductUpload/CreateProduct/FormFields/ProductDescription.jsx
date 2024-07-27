import React from "react";
import JoditEditor from "jodit-react";

const ProductDescription = ({ register, watch, setValue }) => {
  const onDescriptionChange = (value) => {
    setValue("product_description", value);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Description
      </label>
      <JoditEditor
        value={watch("product_description")}
        onChange={onDescriptionChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default ProductDescription;
