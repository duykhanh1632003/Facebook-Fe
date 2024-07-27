import React from "react";
import { useDropzone } from "react-dropzone";

const Thumbnail = ({ thumb, setThumb }) => {
  const onThumbDrop = (acceptedFiles) => {
    setThumb(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onThumbDrop,
    accept: "image/*",
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Thumbnail
      </label>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-5 rounded cursor-pointer"
      >
        <input {...getInputProps()} />
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
  );
};

export default Thumbnail;
