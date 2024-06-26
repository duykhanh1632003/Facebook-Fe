import Lottie from "react-lottie";
import tim from "../tim.json";
const Love = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: tim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={41} width={41} />
    </div>
  );
};

export default Love;
