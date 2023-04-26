import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Card, CardHeader, IconButton, MenuItem, Menu, Avatar } from "@mui/material";
import { MoreVert, DeleteOutlined } from "@mui/icons-material";
import { deleteComment } from "../../redux/apiRequests";

const Comment = ({ id, postUserId, content, username, avatar, createdAt, commentNumber, setCommentNumber }) => {
	const user = useSelector((state) => state.user.user?.currentUser);
	const [closeCmt, setCloseCmt] = useState(true);
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteCmt = () => {
		setCommentNumber(commentNumber - 1);
		deleteComment(dispatch, user?.accessToken, id, postUserId);
		setCloseCmt(false);
	};

	return (
		<>
			{closeCmt && (
				<Card style={{ margin: 5, border: "solid 1px" }}>
					<CardHeader
						style={{ padding: 0 }}
						avatar={
							<NavLink to={`/user/${postUserId}`}>
								<IconButton
									size="small"
									edge="end"
									aria-label="account of current user"
									aria-haspopup="true"
									color="inherit"
								>
									<Avatar alt="Remy Sharp" src={avatar} />
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
						title={username}
						subheader={moment(createdAt).fromNow()}
					/>
					{(user?._id === postUserId || user?.admin) && (
						<Menu
							id="menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "more_icon"
							}}
						>
							<MenuItem onClick={handleDeleteCmt}>
								<DeleteOutlined /> Remove comment
							</MenuItem>
						</Menu>
					)}
					<span style={{ margin: 0, paddingLeft: 2 }}>{content}</span>
				</Card>
			)}
		</>
	);
};

export default Comment;
