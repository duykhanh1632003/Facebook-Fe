import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { axiosHaveAuth } from "../util/axios";

export const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostContextProvider = ({ children }) => {
  const instance = axiosHaveAuth();
  const { id } = useParams();
  const [postId, setPostId] = useState(null);
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [likes, setLikes] = useState(null);
  const [share, setShare] = useState(null);

  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await instance.get(`/api/get/detailPost/${postId}`);
        setPostDetail(response.data.metadata.postDetail);
        setComments(response.data.metadata.comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  useEffect(() => {
    // Example of handling postDetail change
    if (postDetail) {
      console.log("PostDetail updated:", postDetail);
      const { author, createdAt, content, image, likes, share } = postDetail;
      setAuthor(author);
      setCreatedAt(createdAt);
      setContent(content);
      setImage(image);
      setLikes(likes);
      setShare(share);
    }
  }, [postDetail]);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  return (
    <PostContext.Provider
      value={{
        postDetail,
        rootComments: commentsByParentId[null],
        getReplies,
        setPostDetail,
        setPostId,
        author,
        createdAt,
        content,
        image,
        likes,
        share,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
