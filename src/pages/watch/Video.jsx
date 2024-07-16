import React, { useRef } from "react";
import videojs from "video.js";
import "videojs-contrib-quality-levels";
import { LinkVideo } from "../../util/linkVideo";
import VideoJS from "./VideoJS";
import "./WatchContainer.css"; // Import the CSS file

const Video = () => {
  const videoUrl = LinkVideo();
  const videoConRef = useRef(null);
  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
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
