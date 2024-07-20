import { useState } from "react";
import NotCompatibles from "./NotCompatibles/NotCompatibles";
import HaveCompatibles from "./HaveCompatibles/HaveCompatibles";

const Compatibles = () => {
  const [compatibles, setCompatibles] = useState("aaa");
  return (
    <div className="w-full h-ful">
      {compatibles ? <HaveCompatibles /> : <NotCompatibles />}
    </div>
  );
};

export default Compatibles;
