import Lottie from "react-lottie";
import like from "../like.json";
const Like = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: like,
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

export default Like;
