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
    <div className="rounded-full ">
      <Lottie options={defaultOptions} height={40} width={40} />
    </div>
  );
};

export default Like;
