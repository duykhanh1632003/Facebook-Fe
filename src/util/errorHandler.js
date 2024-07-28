import { toast } from "react-toastify";

export const handleApiError = (error) => {
  if (error.response) {
    // Request made and server responded
    toast.error(`Error: ${error.response.data.message}`);
    console.log("Error response data", error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    toast.error("No response received from server");
    console.log("Error request data", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.error(`Error: ${error.message}`);
    console.log("Error message", error.message);
  }
};
