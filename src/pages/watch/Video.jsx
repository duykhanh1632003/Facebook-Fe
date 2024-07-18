import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "videojs-contrib-quality-levels";
import VideoJS from "./VideoJS";
import axios from "axios";
import "./WatchContainer.css"; // Import the CSS file
import { axiosHaveAuth } from "../../util/axios";

const Video = ({ videoUrl, videoId }) => {
  const videoConRef = useRef(null);
  const playerRef = useRef(null);
  const viewSentRef = useRef(false); // To track if view has been sent
  const instance = axiosHaveAuth();
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("timeupdate", () => {
      const currentTime = player.currentTime();
      const duration = player.duration();

      if (
        (currentTime >= 30 ||
          currentTime >= duration * 0.5 ||
          currentTime === duration) &&
        !viewSentRef.current
      ) {
        incrementView();
        viewSentRef.current = true;
      }
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const incrementView = async () => {
    try {
      await instance.post("/api/incrementView", { videoId });
      console.log("View incremented successfully");
    } catch (error) {
      console.error("Failed to increment view", error);
    }
  };

  const videoOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 0.75, 1, 1.5, 1.75, 2],
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
    ],
    controlBar: {
      children: [
        "playToggle",
        "volumePanel",
        "progressControl",
        "currentTimeDisplay",
        "timeDivider",
        "durationDisplay",
        "playbackRateMenuButton", // Add playback rate control
        "pictureInPictureToggle",
        "qualitySelector",
        "fullscreenToggle",
      ],
      durationDisplay: {
        timeToShow: ["duration"],
        countDown: false,
      },
    },
  };

  return (
    <div className="video-player">
      <div className="video-container" ref={videoConRef}>
        <VideoJS options={videoOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default Video;
