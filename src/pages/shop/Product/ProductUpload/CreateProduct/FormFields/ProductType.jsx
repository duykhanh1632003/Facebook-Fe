import React from "react";

const ProductType = ({ register }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Type
      </label>
      <select
        {...register("product_type", { required: true })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="electronic">Electronic</option>
        <option value="clothing">Clothing</option>
        <option value="furniture">Furniture</option>
        <option value="book">Book</option>
        <option value="sports">Sports</option>
        <option value="beauty">Beauty</option>
      </select>
    </div>
  );
};

export default ProductType;
