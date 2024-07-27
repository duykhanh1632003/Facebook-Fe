import React from "react";

const ProductName = ({ register }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Name
      </label>
      <input
        type="text"
        {...register("product_name", { required: true })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default ProductName;
