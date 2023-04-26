import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Comments = ({ post, commentNumber, setCommentNumber }) => {
	const createComments = useSelector((state) => state.comment.createComments);
	const deleteComments = useSelector((state) => state.comment.deleteComments);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		setComments(post?.comments);
	}, [createComments, deleteComments, post?.comments]);

	return (
		<>
			{comments?.map((comment, index) => (
				<Comment
					key={index}
					id={comment._id}
					postUserId={comment.postUserId}
					username={comment.username}
					avatar={comment.avatar}
					createdAt={comment.createdAt}
					content={comment.content}
					commentNumber={commentNumber}
					setCommentNumber={setCommentNumber}
				/>
			))}
		</>
	);
};

export default Comments;
