import Lottie from "react-lottie";
import wow from "../wow.json";
const Wow = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: wow,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={77} width={77} />
    </div>
  );
};

export default Wow;
