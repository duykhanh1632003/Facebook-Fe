import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};
const commentsData = [
  {
    id: "609e14cb2f02c459cc4e1b1g",
    message: "This is the first comment",
    postId: "609e14cb2f02c459cc4e1b1a",
    userId: "609e14cb2f02c459cc4e1b1b",
    parentId: null,
    likes: 5,
    user: {
      firstName: "John",
      lastName: "Doe",
      avatar: "path/to/avatar1.jpg",
    },
  },
  {
    id: "609e14cb2f02c459cc4e1b1h",
    message: "Another comment here",
    postId: "609e14cb2f02c459cc4e1b1a",
    userId: "609e14cb2f02c459cc4e1b1c",
    parentId: "609e14cb2f02c459cc4e1b1g",
    likes: 5,
    user: {
      firstName: "Jane",
      lastName: "Smith",
      avatar: "path/to/avatar2.jpg",
    },
  },
  {
    id: "609e14cb2f02c459cc4e1b1a",
    message: "Comment of user",
    postId: "609e14cb2f02c459cc4e1b1a",
    userId: "609e14cb2f02c459cc4e1b1b",
    parentId: "609e14cb2f02c459cc4e1b1h",
    likes: 5,
    user: {
      firstName: "Jane",
      lastName: "Smith",
      avatar: "path/to/avatar3.jpg",
    },
  },
  {
    id: "609e14cb2f02c459cc4e1b1i",
    message: "Reply to the second comment",
    postId: "609e14cb2f02c459cc4e1b1a",
    userId: "609e14cb2f02c459cc4e1b1d",
    parentId: "609e14cb2f02c459cc4e1b1g",
    likes: 5,
    user: {
      firstName: "Alice",
      lastName: "Johnson",
      avatar: "path/to/avatar3.jpg",
    },
  },
  {
    id: "609e14cb2f02c459cc4e1b1j",
    message: "Yet another comment",
    postId: "609e14cb2f02c459cc4e1b1a",
    userId: "609e14cb2f02c459cc4e1b1f",
    likes: 5,
    parentId: "609e14cb2f02c459cc4e1b1i",
    user: {
      firstName: "Bob",
      lastName: "Brown",
      avatar: "path/to/avatar4.jpg",
    },
  },
  {
    id: "609e14cb2f02c459cc4e1b1k",
    message: "A new top-level comment",
    postId: "609e14cb2f02c459cc4e1b1b",
    userId: "609e14cb2f02c459cc4e1b1e",
    likes: 5,
    parentId: "609e14cb2f02c459cc4e1b1j",
    user: {
      firstName: "Charlie",
      lastName: "Davis",
      avatar: "path/to/avatar5.jpg",
    },
  },
  {
    id: "609e14cb2f02c459cc4e1b1l",
    message: "Reply to the new comment",
    postId: "609e14cb2f02c459cc4e1b1b",
    userId: "609e14cb2f02c459cc4e1b1g",
    parentId: "609e14cb2f02c459cc4e1b1k",
    likes: 5,
    user: {
      firstName: "Eve",
      lastName: "Evans",
      avatar: "path/to/avatar6.jpg",
    },
  },
];
const handleGetPost = async (postId) => {
  // Implement the logic to fetch the post data
  // For example:
  // const response = await fetch(`/api/posts/${postId}`);
  // if (!response.ok) throw new Error('Failed to fetch post');
  // return await response.json();

  // Placeholder implementation for the sake of example
  return {
    id: postId,
    title: "Sample Post",
    content: "This is a sample post.",
  };
};

export const PostContextProvider = ({ children }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(commentsData);
  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const postData = await handleGetPost(postId);
  //       setPost(postData);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (postId) {
  //     fetchPost();
  //   }
  // }, [postId]);
  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  return (
    <PostContext.Provider
      value={{
        post: { postId, ...post },
        rootComments: commentsByParentId[null],
        getReplies,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
