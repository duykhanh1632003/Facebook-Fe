import React from "react";
import { useDropzone } from "react-dropzone";

const Images = ({ images, setImages }) => {
  const onDrop = (acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
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
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
