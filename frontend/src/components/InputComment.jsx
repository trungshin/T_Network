import React, { useState } from "react";
import { CardActions, Button, InputBase } from "@mui/material";
import { createComment, getUserComment } from "../redux/apiRequests";
import { useDispatch } from "react-redux";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const InputComment = ({ post, user}) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleComment = (id) => {

    const newComment = {
      content,
      postUserId: user?._id,
      createdAt: new Date().toISOString(),
    };
    setContent("");
    createComment(dispatch, user?.accessToken, id, newComment);
    // setCloseCmt(true);
    getUserComment(dispatch, user?.accessToken, id);
  };

  return (
    <CardActions>
      <InputBase
        fullWidth
        placeholder="Add your comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {content ? (
        <Button
          variant="contained"
          onClick={(e) => handleComment(post?._id)}
        >
          <CommentOutlinedIcon />
        </Button>
      ) : (
        <Button variant="contained" disabled>
          <CommentOutlinedIcon />
        </Button>
      )}
    </CardActions>
  );
};

export default InputComment;
