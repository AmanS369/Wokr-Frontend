import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useSelector } from "react-redux";
import "../Kanban/CommentDrawer/Comments.css";

const socket = socketIO.connect("/");

const Comments = ({ board_id, col_id, content_id }) => {
  const user = useSelector((state) => state.reducer.user.user);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    socket.emit("fetchComments", { col_id, content_id, board_id });
    socket.on("commentsFetched", (data) => setCommentList(data));

    return () => {
      socket.off("commentsFetched");
    };
  }, [col_id, content_id, board_id, user]);

  const addComment = (e) => {
    e.preventDefault();
    if (user && comment.trim()) {
      socket.emit("addComment", {
        comment,
        content_id,
        col_id,
        board_id,
        user_ID: user,
      });
      setComment("");
    } else {
      console.log("User not found or comment is empty");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addComment(e);
    }
  };

  useEffect(() => {
    socket.on("comments", (newComment) => {
      console.log("Received new comment:", newComment);
      setCommentList(newComment);
    });

    return () => {
      socket.off("comments");
    };
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="comments__container">
      <form className="comment__form" onSubmit={addComment}>
        <textarea
          placeholder="Type your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          id="comment"
          name="comment"
          required
        ></textarea>
      </form>
      <div className="comments__section">
        {/* <h3> Comments</h3> */}
        <div className="comments__list">
          {commentList
            ?.slice()
            .reverse()
            .map((comment) => (
              <div key={comment._id} className="comment__item">
                <p className="comment__text">
                  <span className="comment__author">
                    {comment.editor?.name || null}:
                  </span>{" "}
                  {comment.comment}
                </p>
                <p className="comment__timestamp">
                  {formatTimestamp(comment.createdAt)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
