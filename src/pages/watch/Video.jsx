import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./WatchContainer.css";
import { axiosHaveAuth } from "../../util/axios";

const Video = ({ videoUrl, videoId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const viewSentRef = useRef(false);
  const instance = axiosHaveAuth();

  const incrementView = async () => {
    try {
      await instance.post("/api/incrementView", { videoId });
      console.log("View incremented successfully");
    } catch (error) {
      console.error("Failed to increment view", error);
    }
  };

  useEffect(() => {
    const iframe = document.getElementById("video-iframe");

    const handleIframeLoad = () => {
      setIsLoading(false);
    };

    const handleIframeMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      const { currentTime, duration } = event.data;
      if (
        (currentTime >= 30 ||
          currentTime >= duration * 0.5 ||
          currentTime === duration) &&
        !viewSentRef.current
      ) {
        incrementView();
        viewSentRef.current = true;
      }
    };

    iframe.addEventListener("load", handleIframeLoad);
    window.addEventListener("message", handleIframeMessage);

    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
      window.removeEventListener("message", handleIframeMessage);
    };
  }, [videoId]);

  return (
    <div className="video-player">
      {isLoading && <div className="spinner"></div>}
      <iframe
        id="video-iframe"
        src={videoUrl}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="video-iframe"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default Video;
