import Lottie from "react-lottie";
import phanno from "../phanno.json";
const Phanno = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: phanno,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="">
      <Lottie options={defaultOptions} height={41} width={41} />
    </div>
  );
};

export default Phanno;
