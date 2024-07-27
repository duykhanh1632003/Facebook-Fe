import React from "react";

const ErrorDisplay = ({ error }) => {
  return error ? <p className="text-red-500">{error}</p> : null;
};

export default ErrorDisplay;
