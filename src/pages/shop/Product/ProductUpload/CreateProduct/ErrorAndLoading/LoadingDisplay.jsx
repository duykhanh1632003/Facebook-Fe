import React from "react";
import { LoadingRounded } from "../../../../../../Loading/LoadingRounded";

const LoadingDisplay = ({ loading }) => {
  return loading ? <LoadingRounded /> : null;
};

export default LoadingDisplay;
