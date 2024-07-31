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
import { Link, useNavigate, useParams } from "react-router-dom";

const Posted = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const page = useSelector((state) => state.posts.page);
  const hasMore = useSelector((state) => state.posts.hasMore);
  const instance = axiosHaveAuth();
  const params = useParams();
  console.log("check pareams", params);
  const observer = useRef();
  const navigate = useNavigate();
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
        const data = res.data.metadata;
        const filteredData = userId
          ? data.filter((p) => p.author._id === userId)
          : data;
        setPosts((prevPosts) => [...prevPosts, ...filteredData]);
        dispatch(fetchPostsSuccess(filteredData));
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
        const data = res.data.metadata;
        const filteredData = userId
          ? data.filter((p) => p.author._id === userId)
          : data;
        setPosts(filteredData);
        dispatch(fetchPostsSuccess(filteredData));
      })
      .catch((err) => {
        dispatch(fetchPostsFailure(err.toString()));
      });
  }, [dispatch, params]);

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

  const comeToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="dark:bg-[#242526]">
      {posts?.map((post, index) => {
        const { author, createdAt, content, image, likes } =
          post;
        const isLastPost = posts.length === index + 1;
        const postElement = (
          <div
            key={post._id}
            className="w-full mt-[14px] bg-[#FFFFFF] dark:bg-[#3A3B3C] rounded-md"
            ref={isLastPost ? lastPostElementRef : null}
          >
            <div className="flex justify-between pl-[16px] pr-[16px] pt-[10px]">
              <div className="flex">
                <div
                  onClick={() => comeToProfile(author._id)}
                  className="w-[41px] h-[41px] rounded-full"
                >
                  <img
                    className="w-[41px] h-[41px] rounded-full object-cover"
                    src={author.avatar}
                    alt="avt"
                  />
                </div>
                <div className="ml-[8px]">
                  <div className="text-md font-bold dark:text-white">
                    {author.firstName} {author.lastName}
                  </div>
                  <div className="flex">
                    <div className="text-[11px] font-medium pr-1 text-[#898A8D] dark:text-[#B0B3B8]">
                      {timeFromNow(createdAt)}
                    </div>
                    <div className="text-[#898A8D] dark:text-[#B0B3B8]">
                      <MdPublic />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-center h-[50px]">
                <div className="h-[30px] cursor-pointer w-[30px] rounded-full mt-1 flex items-center justify-center hover:bg-[#eeeaea9f] dark:hover:bg-[#4E4F50]">
                  <BsThreeDots className="text-2xl dark:text-white" />
                </div>
                <div className="h-[30px] cursor-pointer w-[30px] mt-1 rounded-full flex items-center justify-center hover:bg-[#eeeaea9f] dark:hover:bg-[#4E4F50]">
                  <CloseIcon fontSize="small" className="dark:text-white" />
                </div>
              </div>
            </div>
            <div className="pl-[16px] pr-[16px] text-sm font-normal mb-[14px] dark:text-[#E4E6EB]">
              {content}
            </div>
            {image && (
              <Link
                to={`/photo/${post._id}`}
                className="w-[588px] object-contain max-h-[584px]"
              >
                <img
                  className="w-[588px] max-h-[584px] object-cover"
                  src={image}
                  alt="image"
                />
              </Link>
            )}
            <div className="pl-[8px] pr-[8px] pt-[8px] pb-[8px] mt-[4px]">
              <CommentLikeShare postId={post._id} likes={likes} />
            </div>
          </div>
        );
        return postElement;
      })}
    </div>
  );
};

export default Posted;
