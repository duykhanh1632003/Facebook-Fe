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
  const [postId, setPostId] = useState(id);
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const commentsByParentId = useMemo(() => {
    const group = {};
    (comments ?? []).forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }
  function updateLocalComment({ _id, message }) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === _id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await instance.get(`/api/get/detailPost/${postId}`);
        console.log("check res", response);
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

  function getReplies(parentId) {
    return commentsByParentId[parentId] || [];
  }

  return (
    <PostContext.Provider
      value={{
        postId,
        postDetail,
        comments,
        rootComments: commentsByParentId[null] || [],
        getReplies,
        setPostDetail,
        setPostId,
        setComments,
        createLocalComment,
        loading,
        error,
        updateLocalComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
