import RightHeader from "./../../../../Header-item/RightHeader";
import CommentLikeShareDetail from "./CommentLikeShareDetail";
import { FaCaretDown } from "react-icons/fa";
import CommentList from "../../../../Comments/CommentList";
import "./DetailPost.css";
import { useEffect } from "react";
import { usePostContext } from "../../../../../context/PostContext";
import LeftDetailPost from "./LeftDetail/LeftDetailPost";
import TopAvtDetailPost from "./RightDetailPost/TopAvtDetailPost";
import CommentPost from "./RightDetailPost/CommentPost";

const DetailPost = () => {
  const {
    postId,
    rootComments,
    setPostDetail,
    postDetail,
    loading,
    error,
    comments,
  } = usePostContext();

  useEffect(() => {
    if (postDetail) {
      setPostDetail(postDetail);
    }
  }, [postDetail, setPostDetail]);

  if (loading) {
    return <div className="dark:text-white">Loading...</div>;
  }

  if (error) {
    return <div className="dark:text-white">Error: {error}</div>;
  }

  if (!postDetail) {
    return null;
  }

  const { author, createdAt, content, image, likes, share } = postDetail;

  return (
    <div className="flex dark:bg-gray-900 dark:text-white">
      <div>
        <LeftDetailPost image={image} />
      </div>
      <div>
        <div className="mt-2 ml-[120px]">
          <RightHeader />
        </div>
        <div className="w-[362px] pt-[6px] pb-3">
          <div className="w-[362px] border-b border-gray-400 dark:border-gray-600"></div>
        </div>
        <div className="pl-[16px] pr-[16px] comment-list-container">
          <TopAvtDetailPost
            createdAt={createdAt}
            author={author}
            content={content}
          />
          <CommentLikeShareDetail
            postId={postDetail._id}
            likes={likes}
            comments={comments ?? []}
            share={share}
          />
          <div className="w-[331px] pt-[6px]">
            <div className="border-b border-gray-300 w-full dark:border-gray-700"></div>
          </div>
          <div className="flex mr-3 items-center justify-end text-[#606770] dark:text-gray-400 font-medium cursor-pointer">
            <div className="">Tất cả bình luận</div>
            <div>
              <FaCaretDown />
            </div>
          </div>
          <div className="w-[331px] pt-[6px] pb-3">
            <CommentList
              postId={postDetail._id}
              comments={rootComments ?? []}
            />
          </div>
        </div>
        <CommentPost postId={postId} />
      </div>
    </div>
  );
};

export default DetailPost;
