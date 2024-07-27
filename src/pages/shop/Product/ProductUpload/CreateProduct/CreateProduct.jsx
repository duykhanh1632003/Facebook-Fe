import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { generateAttributes } from "../../../../../util/util";
import { useDropzone } from "react-dropzone";
import slugify from "slugify";
import JoditEditor from "jodit-react";
import "./CreateProduct.css";

const CreateProduct = () => {
  const { register, handleSubmit, control, setValue, getValues, watch } =
    useForm({
      defaultValues: {
        attributes: [],
        images: [],
        product_description: "",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const [combinations, setCombinations] = useState([]);
  const [images, setImages] = useState([]);
  const [thumb, setThumb] = useState(null);
  const selectedAttributes = watch("attributes");

  const onDrop = (acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const onThumbDrop = (acceptedFiles) => {
    setThumb(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const { getRootProps: getThumbRootProps, getInputProps: getThumbInputProps } =
    useDropzone({
      onDrop: onThumbDrop,
      accept: "image/*",
    });

  const attributes = generateAttributes();

  useEffect(() => {
    generateCombinations();
  }, [selectedAttributes]);

  const generateCombinations = () => {
    if (selectedAttributes.length === 0) return;
    const values = selectedAttributes.map((attr) => attr.value.split(","));
    const result = values.reduce((acc, value) => {
      if (acc.length === 0) return value.map((v) => [v]);
      return acc.flatMap((x) => value.map((v) => x.concat(v)));
    }, []);
    setCombinations(result);
  };

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

  const handleRemoveAttribute = (index) => {
    remove(index);
    const updatedAttributes = getValues("attributes").filter(
      (_, i) => i !== index
    );
    setValue("attributes", updatedAttributes);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onDescriptionChange = (value) => {
    setValue("product_description", value);
  };

  const onSubmit = (data) => {
    data.slug = slugify(data.product_name, { lower: true });
    data.images = images;
    data.thumb = thumb;
    console.log(data);
  };

  const isAttributeSelected = (category) => {
    return selectedAttributes.some((attr) => attr.category === category);
  };

  return (
    <div className="container mx-auto p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded shadow-lg"
      >
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Attributes
          </label>
          {fields.map((item, index) => (
            <div key={item.id} className="mb-2 flex items-center">
              <div className="flex w-full">
                <select
                  {...register(`attributes.${index}.category`, {
                    required: true,
                    onChange: (e) =>
                      handleAttributeChange(index, e.target.value),
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
          ))}
          {fields.length < 2 && (
            <button
              type="button"
              onClick={() =>
                append({ id: fields.length, category: "", value: "" })
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Add Attribute
            </button>
          )}
        </div>

        {combinations.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Attribute Combinations
            </label>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {selectedAttributes.map((attr, index) => (
                    <th key={index} className="px-4 py-2">
                      {attr.category}
                    </th>
                  ))}
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {combinations.map((combination, index) => (
                  <tr key={index}>
                    {combination.map((value, i) => (
                      <td key={i} className="border px-4 py-2">
                        {value}
                      </td>
                    ))}
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        {...register(`combinations.${index}.quantity`, {
                          required: true,
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Quantity"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        {...register(`combinations.${index}.price`, {
                          required: true,
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Price"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Images
          </label>
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-5 rounded cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div className="mt-2 flex flex-wrap">
            {images.map((file, index) => (
              <div key={index} className="relative m-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`product ${index}`}
                  className="w-24 h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Thumbnail
          </label>
          <div
            {...getThumbRootProps()}
            className="border-dashed border-2 border-gray-400 p-5 rounded cursor-pointer"
          >
            <input {...getThumbInputProps()} />
            <p>Drag 'n' drop a file here, or click to select a file</p>
          </div>
          {thumb && (
            <img
              src={URL.createObjectURL(thumb)}
              alt="Thumbnail"
              className="w-24 h-24 mt-2 object-cover"
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
