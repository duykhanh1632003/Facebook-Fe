import LeftWatch from "./LeftWatch/LeftWatch";
import MiddleWatch from "./MiddleWatch/MiddleWatch";

const WatchContainer = () => {
  return (
    <div>
      <LeftWatch />
      <MiddleWatch />
      <div className="h-[200px]"></div>
    </div>
  );
};

export default WatchContainer;
