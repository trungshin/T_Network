import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {
	Card,
	CardHeader,
	IconButton,
	MenuItem,
	Menu,
	useMediaQuery,
	Avatar,
	Button,
	Typography,
	TextField,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Stack
} from "@mui/material";
import { MoreVert, DeleteOutlined, EditOutlined, Close } from "@mui/icons-material";
import { deleteComment, updateComment } from "../../redux/apiRequests";
import { useTheme } from "@mui/material/styles";

const Comment = ({ id, postUserId, content, username, avatar, createdAt, commentNumber, setCommentNumber }) => {
	const user = useSelector((state) => state.user.user?.currentUser);
	const [closeCmt, setCloseCmt] = useState(true);
	const [contentState, setContentState] = useState(content);
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [openDialog, setOpenDialog] = useState(false);
	const [scroll, setScroll] = useState("paper");

	const handleClickOpen = (scrollType) => {
		setOpenDialog(true);
		setScroll(scrollType);
	};

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleDeleteCmt = () => {
		setCommentNumber(commentNumber - 1);
		deleteComment(dispatch, user?.accessToken, id, postUserId);
		setCloseCmt(false);
	};

	const handleUpdateComment = () => {
		const newComment = {
			userId: user?._id,
			content: contentState
		};
		updateComment(dispatch, user?.accessToken, id, newComment);
		handleCloseDialog();
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
									aria-label="user account"
									aria-haspopup="true"
									color="inherit"
								>
									<Avatar alt={username} src={avatar} />
								</IconButton>
							</NavLink>
						}
						action={
							<IconButton
								id="more_icon"
								aria-controls={open ? "cmt-menu" : undefined}
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
							id="cmt-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "more_icon"
							}}
						>
							<MenuItem className="item" sx={{ color: "#333" }} onClick={handleDeleteCmt}>
								<DeleteOutlined color="#333" /> Remove comment
							</MenuItem>
							{user?._id === postUserId && (
								<MenuItem
									className="item"
									sx={{ color: "#333" }}
									onClick={() => handleClickOpen("paper")}
								>
									<EditOutlined color="#333" /> Edit Comment
								</MenuItem>
							)}
						</Menu>
					)}
					<span style={{ margin: 0, paddingLeft: 2 }}>{contentState}</span>
				</Card>
			)}
			<Dialog
				fullScreen={fullScreen}
				open={openDialog}
				onClose={handleCloseDialog}
				scroll={scroll}
				aria-labelledby="cmt-edit-dialog-title"
			>
				<DialogTitle id="cmt-edit-dialog-title">
					{"Update Comment"}
					<IconButton
						aria-label="close"
						onClick={handleCloseDialog}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500]
						}}
					>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers={scroll === "paper"}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginLeft: "5px"
						}}
					>
						<IconButton
							size="small"
							edge="end"
							aria-label="user account"
							aria-haspopup="true"
							color="inherit"
						>
							<Avatar alt={username} src={avatar} />
						</IconButton>
						<Typography>{username}</Typography>
					</div>
					<TextField
						variant="standard"
						value={contentState}
						id="comment"
						name="comment"
						onChange={(e) => setContentState(e.target.value)}
						multiline
						rows={10}
						sx={{
							width: "500px"
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Stack direction="row" spacing={2}>
						{contentState ? (
							<Button autoFocus variant="contained" onClick={handleUpdateComment}>
								Update
							</Button>
						) : (
							<Button variant="contained" disabled>
								Update
							</Button>
						)}
					</Stack>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Comment;
