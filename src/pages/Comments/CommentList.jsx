import React from "react";
import Comment from "./Comment";
import "./CommentList.css"; // Import CSS for styling

const CommentList = ({ comments, level = 0 }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} level={level} />
      ))}
    </div>
  );
};

export default CommentList;
