import { axiosHaveAuth } from "./axios";

const handleAddNewPost = (body) => {
  return instance.post("/new/post", body);
};

export { handleAddNewPost };
