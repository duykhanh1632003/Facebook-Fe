import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosHaveAuth } from "../../../../util/axios";
import CommentLikeShare from "./CommentLikeShare";
import { MdPublic } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import {
  fetchPostsSuccess,
  fetchPostsStart,
  fetchPostsFailure,
} from "../../../../redux/post/postsSlice";
import LikeIcon from "../../../../img/LikeIcon";

const Posted = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const instance = axiosHaveAuth();
  console.log("Check list", posts);
  useEffect(() => {
    dispatch(fetchPostsStart());
    try {
      instance.get("/api/get/allPosts").then((res) => {
        dispatch(fetchPostsSuccess(res.data.metadata));
      });
    } catch (error) {
      dispatch(fetchPostsFailure(error.toString()));
    }
  }, []);

  const timeFromNow = (date) => {
    const now = moment();
    const postDate = moment(date);
    if (now.diff(postDate, "days") >= 7) {
      return postDate.format("MMM Do YYYY");
    }
    return postDate.fromNow();
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts?.map((post) => {
        const { author, createdAt, content, image, likes, comments, share } =
          post;
        return (
          <div
            key={post._id}
            className="w-full mt-[14px] bg-[#FFFFFF] rounded-md"
          >
            <div className="flex justify-between pl-[16px] pr-[16px] pt-[10px]">
              <div className="flex">
                <div className="w-[41px] h-[41px] rounded-full">
                  <img
                    className="w-[41px] h-[41px] rounded-full object-cover"
                    src={author.avatar}
                    alt="avt"
                  />
                </div>
                <div className="ml-[8px]">
                  <div className="text-md font-bold">
                    {author.firstName} {author.lastName}
                  </div>
                  <div className="flex">
                    <div className="text-[11px] font-medium pr-1 text-[#898A8D]">
                      {timeFromNow(createdAt)}
                    </div>
                    <div className="text-[#898A8D]">
                      <MdPublic />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-center h-[50px]">
                <div className="h-[30px] cursor-pointer w-[30px] rounded-full mt-1 flex items-center justify-center hover:bg-[#eeeaea9f]">
                  <BsThreeDots className="text-2xl" />
                </div>
                <div className="h-[30px] cursor-pointer w-[30px] mt-1 rounded-full flex items-center justify-center hover:bg-[#eeeaea9f]">
                  <CloseIcon fontSize="small" />
                </div>
              </div>
            </div>
            <div className="pl-[16px] pr-[16px] text-sm font-normal mb-[14px]">
              {content}
            </div>

            {image && (
              <div className="w-[588px] object-contain max-h-[584px]">
                <img
                  className="w-[588px] max-h-[584px] object-cover"
                  src={image}
                  alt="image"
                />
              </div>
            )}

            <div className="flex justify-between items-center text-[#77797C] pl-[16px] pr-[16px] pt-[12px]">
              <div className="flex">
                <LikeIcon />
                <div className="text-[13px] font-normal text-[#65676B]">
                  {likes.length} like
                </div>
              </div>
              <div className="text-[13px] font-normal text-[#65676B]">
                {comments.length} comments
              </div>
              <div className="text-[13px] font-normal text-[#65676B]">
                {share.length} share
              </div>
            </div>
            <div className="pl-[8px] pr-[8px] pt-[8px] pb-[8px] mt-[4px]">
              <CommentLikeShare postId={post._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posted;
