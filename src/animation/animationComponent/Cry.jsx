import Lottie from "react-lottie";
import cry from "../cry.json";
const Cry = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cry,
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

export default Cry;
