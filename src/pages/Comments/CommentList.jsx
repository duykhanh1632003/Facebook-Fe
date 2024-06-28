import React from "react";
import Comment from "./Comment";
import "./CommentList.css"; // Import CSS for styling

const CommentList = ({ comments, level = 0, postId }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.id} postId={postId} {...comment} level={level} />
      ))}
    </div>
  );
};

export default CommentList;
