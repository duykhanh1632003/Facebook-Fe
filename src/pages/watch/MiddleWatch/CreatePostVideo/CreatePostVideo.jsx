import React, { useState, useRef } from "react";
import Button from "./Button";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useVideoPostContext } from "../../../../context/VideoPostContext";
import { LoadingRounded } from "../../../../Loading/LoadingRounded";

function CreatePostVideo({ setShowModal, showModal }) {
  const [video, setVideo] = useState(null);
  const [content, setContent] = useState("");
  const [label, setLabel] = useState("Upload your video...");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const videoRef = useRef(null);
  const { uploadVideoToFirebase } = useVideoPostContext();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setLabel(file ? URL.createObjectURL(file) : "Upload your video...");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (content && video) {
      try {
        await uploadVideoToFirebase(video, content);
        setContent("");
        setVideo(null);
        setLabel("Upload your video...");
        setShowModal(false);
      } catch (error) {
        console.error("Error uploading video:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Add content and select a video");
      setLoading(false);
    }
  };

  const addEmoji = (emoji) => {
    setContent(content + emoji.native);
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    setLabel("Upload your video...");
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-1/3 p-6 relative">
            <h2 className="text-2xl text-center text-blue-600 mb-4">
              Upload Video
            </h2>
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="content"
                  className="text-blue-600 font-semibold"
                >
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Enter content here..."
                  value={content}
                  onChange={handleContentChange}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="mr-2 text-blue-600"
                  >
                    {showEmojiPicker ? "Close" : "Add Emoji"}
                  </button>
                  {showEmojiPicker && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50px",
                        right: "10px",
                      }}
                    >
                      <Picker data={data} onEmojiSelect={addEmoji} />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[330px] relative">
                <label htmlFor="video" className="text-blue-600 font-semibold">
                  Video Upload
                </label>
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded p-4 cursor-pointer relative">
                  {video && (
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  )}
                  <label
                    htmlFor="video"
                    className="text-gray-500 cursor-pointer w-full h-full flex items-center justify-center"
                  >
                    {video ? (
                      <video ref={videoRef} className="w-full h-auto" controls>
                        <source src={label} type="video/mp4" />
                      </video>
                    ) : (
                      label
                    )}
                  </label>
                  <input
                    type="file"
                    name="video"
                    id="video"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideo}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  name="Upload"
                  icon={<i className="fas fa-upload"></i>}
                  bg="bg-blue-500"
                  type="submit"
                  disabled={loading}
                />
              </div>
            </form>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                <LoadingRounded />
              </div>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePostVideo;
