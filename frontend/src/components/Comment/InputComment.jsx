import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CardActions, Button, InputBase } from "@mui/material";
import { CommentOutlined } from "@mui/icons-material";
import { createComment } from "../../redux/apiRequests";

const InputComment = ({ post, user, commentNumber, setCommentNumber }) => {
	const [content, setContent] = useState("");
	const dispatch = useDispatch();

	const handleComment = (e, postId) => {
		e.preventDefault();
		setCommentNumber(commentNumber + 1);
		const newComment = {
			content,
			postUserId: user?._id,
			createdAt: new Date().toISOString()
		};
		setContent("");
		createComment(dispatch, user?.accessToken, postId, newComment);
		window.location.reload();
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
				<Button variant="contained" onClick={(e) => handleComment(e, post?._id)}>
					<CommentOutlined />
				</Button>
			) : (
				<Button variant="contained" disabled>
					<CommentOutlined />
				</Button>
			)}
		</CardActions>
	);
};

export default InputComment;
