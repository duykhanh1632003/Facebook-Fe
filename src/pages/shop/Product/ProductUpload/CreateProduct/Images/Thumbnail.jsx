import React from "react";
import { useDropzone } from "react-dropzone";
import { MdCancel } from "react-icons/md";

const Thumbnail = ({ thumb, setThumb }) => {
  const onThumbDrop = (acceptedFiles) => {
    setThumb(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onThumbDrop,
    accept: "image/*",
  });
  const handleRemoveImage = (index) => {
    setThumb(null);
  };
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
        <div className="relative m-2">
          {" "}
          <img
            src={URL.createObjectURL(thumb)}
            alt="Thumbnail"
            className="w-24 h-24 mt-2 object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemoveImage()}
            className="absolute top-0 left-[72px] bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded-full"
          >
            <MdCancel />
          </button>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
