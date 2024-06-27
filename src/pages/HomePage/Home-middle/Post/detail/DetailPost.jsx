import RightHeader from "./../../../../Header-item/RightHeader";
import CommentLikeShareDetail from "./CommentLikeShareDetail";
import { FaCaretDown } from "react-icons/fa";
import CommentList from "../../../../Comments/CommentList";
import "./DetailPost.css";
import { useEffect } from "react";
import { usePostContext } from "../../../../../context/PostContext";
import { useParams } from "react-router-dom";
import { axiosHaveAuth } from "../../../../../util/axios";
import LeftDetailPost from "./LeftDetail/LeftDetailPost";
import TopAvtDetailPost from "./RightDetailPost/TopAvtDetailPost";
import CommentPost from "./RightDetailPost/CommentPost";

const DetailPost = () => {
  const instance = axiosHaveAuth();
  const { id } = useParams();
  const {
    post,
    rootComments,
    setPostId,
    author,
    createdAt,
    setPostDetail,
    content,
    image,
    likes,
    share,
  } = usePostContext();

  useEffect(() => {
    if (id) {
      setPostId(id); // Update postId in context
      instance
        .get(`/api/get/detailPost/${id}`)
        .then((res) => {
          const postData = res.data.metadata.postDetail;
          setPostDetail(postData); // Update post in context
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
        });
    }
  }, [id, setPostId, setPostDetail]); // Include setPostId and setPost in dependency array

  useEffect(() => {
    console.log("post", post);
  }, [post]); // Include setPostId and setPost in dependency array

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex overflow-hidden">
      <div>
        <LeftDetailPost image={image} />
      </div>
      <div>
        <div className="mt-2 ml-[120px]">
          <RightHeader />
        </div>
        <div className="w-[362px] pt-[6px] pb-3">
          <div className="w-[362px] border-b border-gray-400"></div>
        </div>
        <div className="pl-[16px] pr-[16px] comment-list-container">
          <TopAvtDetailPost
            createdAt={createdAt}
            author={author}
            content={content}
          />
          <CommentLikeShareDetail
            postId={post._id}
            likes={likes}
            comments={rootComments} // Use rootComments instead of comments
            share={share}
          />
          <div className="w-[331px] pt-[6px]">
            <div className="border-b border-gray-300 w-full"></div>
          </div>
          <div className="flex mr-3 items-center justify-end text-[#606770] font-medium cursor-pointer">
            <div className="">Tất cả bình luận</div>
            <div>
              <FaCaretDown />
            </div>
          </div>
          <div className="w-[331px] pt-[6px] pb-3">
            <CommentList comments={rootComments} />
          </div>
        </div>
        <CommentPost />
      </div>
    </div>
  );
};

export default DetailPost;
