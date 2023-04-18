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
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	useMediaQuery,
	TextField,
	Button,
	Stack,
	Tooltip,
	Box
} from "@mui/material";
import { MoreVert, DeleteOutlined, Message, EditOutlined } from "@mui/icons-material";
import { likePost, unLikePost, deletePost, getUserComment } from "../../redux/apiRequests";
import LikeButton from "../LikeButton";
import Comment from "../Comment";
import InputComment from "../InputComment";
import { useTheme, styled } from "@mui/material/styles";
import { Close, PhotoCamera } from "@mui/icons-material";
import { updatePost } from "../../redux/apiRequests";
import { red } from "@mui/material/colors";

const Input = styled("input")({
	display: "none"
});

const Img = styled("img")(({ theme }) => ({
	borderRadius: "5px",
	display: "block",
	height: 150,
	[theme.breakpoints.down("sm")]: {
		height: 50
	}
}));

const Post = ({ post }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [scroll, setScroll] = useState("paper");
	const [isLike, setIsLike] = useState(false);
	const [likeNumber, setLikeNumber] = useState(post?.likes?.length);
	const user = useSelector((state) => state.user.user?.currentUser);
	const { comments } = useSelector((state) => state.comment.userComments);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [description, setDescription] = useState(post?.description);
	const [images, setImages] = useState(post?.img);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
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

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleUpdatePost = () => {
		if (!images) {
			const newPost = {
				userId: user?._id,
				description: description
			};
			updatePost(dispatch, user?.accessToken, post?._id, newPost);
		} else if (images) {
			const newPost = {
				userId: user?._id,
				description: description,
				img: images
			};
			updatePost(dispatch, user?.accessToken, post?._id, newPost);
		}
		setImages("");
		handleClose();
		window.location.reload();
	};

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
	};
	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImages(reader.result);
		};
	};

	const StylesPost = styled(Box)(() => ({
		marginTop: "16px",
		marginBottom: "16px",
		backgroundColor: "#fff",

		".card": {
			boxShadow: "0 0 2px 1px rgba(0,0,0,0.2) !important"
		}
	}));

	return (
		<StylesPost>
			<Card className="card">
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
							"aria-labelledby": "more_icon"
						}}
					>
						<MenuItem onClick={() => handleDelete(post?._id)}>
							<DeleteOutlined /> Remove Post
						</MenuItem>
						{user?._id === post?.userId && (
							<MenuItem onClick={() => handleClickOpen("paper")}>
								<EditOutlined /> Edit Post
							</MenuItem>
						)}
					</Menu>
				)}
				<CardContent style={{ padding: 0 }}>
					{post?.description !== "" && (
						<Typography style={{ padding: 16 }} variant="body2">
							{post?.description}
						</Typography>
					)}
					{post?.img && (
						<img
							style={{
								maxWidth: "100%",
								objectFit: "contain"
							}}
							src={post?.img}
							alt="postImg"
						/>
					)}
				</CardContent>
				<CardActions style={{ padding: 0 }}>
					<IconButton color="primary">
						<LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
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

				<Dialog
					fullScreen={fullScreen}
					open={openDialog}
					onClose={handleCloseDialog}
					scroll={scroll}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">
						{"Update Post"}
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
								aria-label="account of current user"
								aria-haspopup="true"
								color="inherit"
							>
								<Avatar alt={user?.username} src={user?.avatar} />
							</IconButton>
							<Typography>{user?.username}</Typography>
						</div>
						<TextField
							variant="standard"
							value={description}
							id="post"
							name="post"
							onChange={(e) => setDescription(e.target.value)}
							multiline
							rows={10}
							sx={{
								width: "500px"
							}}
						/>
						<div
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								justifyContent: "left",
								display: "flex"
							}}
						>
							{images && (
								<div
									style={{
										marginTop: "22px",
										marginRight: "8px",
										position: "relative"
									}}
								>
									<IconButton
										onClick={() => {
											setImages("");
										}}
										sx={{
											top: "-5%",
											right: "-5%",
											position: "absolute"
										}}
									>
										<Close />
									</IconButton>
									<Img src={images} />
								</div>
							)}
						</div>
					</DialogContent>
					<DialogActions>
						<Stack direction="row" spacing={2}>
							<div>
								<Input
									accept="image/*"
									id="icon-button-file"
									type="file"
									onChange={handleFileInputChange}
								/>
								<Tooltip title="Attach photo" placement="top" arrow>
									<label htmlFor="icon-button-file">
										<IconButton color="primary" aria-label="upload picture" component="span">
											<PhotoCamera />
										</IconButton>
									</label>
								</Tooltip>
							</div>
							{description || images ? (
								<Button autoFocus variant="contained" onClick={handleUpdatePost}>
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
			</Card>
		</StylesPost>
	);
};

export default Post;
