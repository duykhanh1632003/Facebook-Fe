import React from "react";

export const AttributeItem = ({
  index,
  item,
  register,
  handleAttributeChange,
  handleRemoveAttribute,
  isAttributeSelected,
  attributes,
}) => {
  return (
    <div className="mb-2 flex items-center">
      <div className="flex w-full">
        <select
          {...register(`attributes.${index}.category`, {
            required: true,
            onChange: (e) => handleAttributeChange(index, e.target.value),
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Attribute</option>
          {attributes.map((attr) => (
            <option
              key={attr.id}
              value={attr.category}
              disabled={isAttributeSelected(attr.category)}
            >
              {attr.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          {...register(`attributes.${index}.value`, { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
          placeholder="Values (comma separated)"
        />
      </div>
      <button
        type="button"
        onClick={() => handleRemoveAttribute(index)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
      >
        Remove
      </button>
    </div>
  );
};
