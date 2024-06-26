import { useCallback, useEffect, useRef, useState } from "react";
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
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const page = useSelector((state) => state.posts.page);
  const hasMore = useSelector((state) => state.posts.hasMore);

  const instance = axiosHaveAuth();

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );

  const loadMorePosts = () => {
    dispatch(fetchPostsStart());
    instance
      .get("/api/get/allPosts", { params: { page, limit: 10 } })
      .then((res) => {
        setPosts((prevPosts) => [...prevPosts, ...res.data.metadata]);
        dispatch(fetchPostsSuccess(res.data.metadata));
      })
      .catch((err) => {
        dispatch(fetchPostsFailure(err.toString()));
      });
  };

  useEffect(() => {
    dispatch(fetchPostsStart());
    instance
      .get("/api/get/allPosts", { params: { page, limit: 10 } })
      .then((res) => {
        console.log("Check data", res.data.metadata);
        setPosts(res.data.metadata);
        dispatch(fetchPostsSuccess(res.data.metadata));
      })
      .catch((err) => {
        dispatch(fetchPostsFailure(err.toString()));
      });
  }, []);

  const timeFromNow = (date) => {
    const now = moment();
    const postDate = moment(date);
    if (now.diff(postDate, "days") >= 7) {
      return postDate.format("MMM Do YYYY");
    }
    return postDate.fromNow();
  };

  if (status === "failed") {
    console.log(error);
  }

  return (
    <div>
      {posts?.map((post, index) => {
        const { author, createdAt, content, image, likes, comments, share } =
          post;
        if (posts.length === index + 1) {
          return (
            <div
              key={post._id}
              ref={lastPostElementRef}
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

              <div className="pl-[8px] pr-[8px] pt-[8px] pb-[8px] mt-[4px]">
                <CommentLikeShare postId={post._id} likes={likes} />
              </div>
            </div>
          );
        } else {
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

              <CommentLikeShare
                postId={post._id}
                comments={comments}
                share={share}
                likes={likes}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
export default Posted;
