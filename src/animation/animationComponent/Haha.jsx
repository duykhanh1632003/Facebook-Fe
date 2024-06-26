import Lottie from "react-lottie";
import haha from "../haha.json";
const Haha = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: haha,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={60} width={60} />
    </div>
  );
};

export default Haha;
