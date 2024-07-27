import React from "react";
import { AttributeItem } from "./AttributeItem";

const Attributes = ({
  fields,
  append,
  remove,
  register,
  setValue,
  getValues,
  watch,
  attributes,
}) => {
  const handleAttributeChange = (index, category) => {
    const attribute = attributes.find((attr) => attr.category === category);
    if (attribute) {
      setValue(`attributes.${index}.value`, attribute.value);
      updateSelectedAttributes(index, category, attribute.value);
    }
  };

  const updateSelectedAttributes = (index, category, value) => {
    const updatedAttributes = getValues("attributes").map((attr, i) => {
      if (i === index) return { category, value };
      return attr;
    });
    setValue("attributes", updatedAttributes);
  };

  const isAttributeSelected = (category) => {
    return watch("attributes").some((attr) => attr.category === category);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Attributes
      </label>
      {fields.map((item, index) => (
        <AttributeItem
          key={item.id}
          index={index}
          item={item}
          register={register}
          handleAttributeChange={handleAttributeChange}
          handleRemoveAttribute={remove}
          isAttributeSelected={isAttributeSelected}
          attributes={attributes}
        />
      ))}
      {fields.length < 2 && (
        <button
          type="button"
          onClick={() => append({ id: fields.length, category: "", value: "" })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Add Attribute
        </button>
      )}
    </div>
  );
};
export default Attributes;
