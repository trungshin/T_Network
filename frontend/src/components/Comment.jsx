import React, { useState } from "react";
import { Card, CardHeader, IconButton, MenuItem, Menu } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteComment } from "../redux/apiRequests";
import moment from "moment";
import { MoreVert, DeleteOutlined } from "@mui/icons-material";

const Comment = ({ id, postId, postUserId, content, username, avatar, createdAt }) => {
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [closeCmt, setCloseCmt] = useState(true);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteCmt = () => {
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
