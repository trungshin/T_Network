import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, DeleteOutlined, Message} from "@mui/icons-material";
import {
  likePost,
  unLikePost,
  deletePost,
  getUserComment,
} from "../../redux/apiRequests";
import LikeButton from "../LikeButton";
import Comment from "../Comment";
import InputComment from "../InputComment";

const Post = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(post?.likes?.length);
  const user = useSelector((state) => state.user.user?.currentUser);
  const { comments } = useSelector((state) => state.comment.userComments);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  // Likes
  useEffect(() => {
    if (post?.likes?.includes(user?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, user._id]);

  const handleLike = () => {
    setIsLike(true);
    setLikeNumber(isLike ? likeNumber - 1 : likeNumber + 1);
    likePost(dispatch, user?.accessToken, post._id, user?._id);
  };

  const handleUnLike = () => {
    setIsLike(false);
    setLikeNumber(isLike ? likeNumber - 1 : likeNumber + 1);
    unLikePost(dispatch, user?.accessToken, post._id, user?._id);
  };

  const handleDelete = (id) => {
    deletePost(dispatch, user?.accessToken, id, user?._id);
    window.location.reload();
  };

  const handleComment = (id) => {
    getUserComment(dispatch, user?.accessToken, id);
  };

  return (
    <Card
      sx={{
        borderRadius: "14px",
        margin: 5,
      }}
    >
      <CardHeader
        avatar={
          <NavLink to={`/user/${post?.userId}`}>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar alt="Travis Howard" src={post?.avatar} />
            </IconButton>
          </NavLink>
        }
        action={
          <IconButton
            id="more_icon"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
        }
        title={post?.username}
        subheader={moment(post?.createdAt).fromNow()}
      />
      {(user?._id === post?.userId || user?.admin) && (
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "more_icon",
          }}
        >
          <MenuItem onClick={() => handleDelete(post?._id)}>
            <DeleteOutlined /> Remove Post
          </MenuItem>
        </Menu>
      )}
      <CardContent>
        <Typography variant="body2">{post?.description}</Typography>
        {post?.img && (
          <div>
            <img
              style={{
                marginTop: "1rem",
                maxWidth: "100%",
                objectFit: "contain",
              }}
              src={post?.img}
              alt="postImg"
            />
          </div>
        )}
      </CardContent>
      <CardActions style={{ paddingBottom: 0 }}>
        <IconButton color="primary">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </IconButton>
        <h6>{likeNumber} likes</h6>
        <IconButton color="primary">
          <Message onClick={() => handleComment(post?._id)} />
        </IconButton>
        <h6>{post?.comments} comments</h6>
      </CardActions>
      {comments?.length > 0 &&
        comments.map((comment) => (
          <Comment
            key={comment._id}
            id={comment._id}
            postId={comment.postId}
            postUserId={comment.postUserId}
            username={comment.username}
            avatar={comment.avatar}
            createdAt={comment.createdAt}
            content={comment.content}
          />
        ))}
      <InputComment post={post} user={user} />
    </Card>
  );
};

export default Post;
