import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Stack, Avatar, Typography } from "@mui/material";
import Post from "../../components/Posts/Post";
import { getUserPost } from "../../redux/apiRequests";
import { getUser } from "../../redux/apiRequests";
import EditPage from "../../components/Profile/EditPage";
import Introduce from "../../components/Profile/Introduce";
import Follows from "../../components/Profile/Follows";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CreatePost from "../../components/Posts/CreatePosts";

const Profile = () => {
	const user = useSelector((state) => state.user.user?.currentUser);
	const otherUser = useSelector((state) => state.user.otherUser?.otherUser);
	const followings = otherUser?.followings?.find((item) => item === user?._id);
	const followers = otherUser?.followers?.find((item) => item === user?._id);
	const [open, setOpen] = useState(false);
	const [scroll, setScroll] = useState("paper");
	const { posts } = useSelector((state) => state.post.userPost);
	const dispatch = useDispatch();
	const { id } = useParams();

	const handleClickOpen = (scrollType) => {
		setOpen(true);
		setScroll(scrollType);
	};

	useEffect(() => {
		getUser(dispatch, id, user?.accessToken);
	}, [dispatch, id, user]);

	useEffect(() => {
		getUserPost(dispatch, user?.accessToken, id);
	}, [dispatch, user, id]);

	return (
		<Box classNames="page-profile">
			<Box sx={{ position: "relative" }}>
				<Box classNames="cover-bg" sx={{ width: "100%", height: 300, borderRadius: 3, overflow: "hidden" }}>
					<img
						src={otherUser?.coverPhoto}
						alt=""
						width="100%"
						style={{
							borderRadius: "12px",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundPosition: "center"
						}}
					/>
				</Box>

				<Stack
					sx={{ position: "relative", height: 100, boxShadow: "0 1px 0px rgba(0,0,0,0.2)", paddingBottom: 2 }}
				>
					<Stack flexDirection="row">
						<Avatar
							sx={{
								width: 120,
								height: 120,
								position: "absolute",
								top: -60,
								left: "50%",
								transform: "translateX(-50%)",
								boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
								backgroundColor: "#fff"
							}}
							alt={otherUser?.username}
							src={otherUser?.avatar}
						/>

						<Box
							classNames="relation"
							sx={{
								position: "absolute",
								right: 0,
								top: 20
							}}
						>
							{otherUser?._id === user?._id ? null : followings === undefined ||
							  followers === undefined ? (
								// <Chip label="Stranger" color="error" icon={<People />} />
								<AddFriend />
							) : followings === followers &&
							  (otherUser?.followings?.length && otherUser?.followers?.length) > 0 ? (
								// <Chip label="Friend" color="primary" icon={<People />} />
								<AddFriend />
							) : null}

							{otherUser?._id === user?._id && (
								// <Button
								// 	onClick={() => handleClickOpen("paper")}
								// 	variant="contained"
								// 	sx={{
								// 		padding: "8px 30px"
								// 	}}
								// >
								// 	Edit
								// </Button>

								<Stack
									flexDirection="row"
									justifyContent="center"
									alignItems="center"
									sx={{
										padding: "10px 25px",
										backgroundColor: "#ddd",
										borderRadius: 2,
										cursor: "pointer",

										":hover": {
											backgroundColor: "#ccc"
										}
									}}
									onClick={() => handleClickOpen("paper")}
								>
									<Stack flexDirection="row" justifyContent="center" sx={{ mr: 1 }}>
										<CreateOutlinedIcon sx={{ fontSize: 19 }} />
									</Stack>
									<Box>
										<Typography fontSize={14} fontWeight={500}>
											Edit Profile
										</Typography>
									</Box>
								</Stack>
							)}
						</Box>

						<EditPage open={open} setOpen={setOpen} scroll={scroll} />
					</Stack>

					<Stack justifyContent="end" alignItems="center" height="100%">
						<Typography fontSize={24} fontWeight={500}>
							{otherUser?.username}
						</Typography>
					</Stack>
				</Stack>
			</Box>

			<Stack flexDirection="row" position="relative" width="80%" margin="0 auto">
				<Stack
					width="70%"
					flexDirection="column"
					paddingTop={2}
					paddingRight={2}
					sx={{
						"& > div:first-child": {
							marginBottom: 2
						}
					}}
				>
					<Box>
						<CreatePost />
					</Box>

					{posts?.map((post) => {
						return <Post key={post._id} post={post} />;
					})}
				</Stack>

				<Stack width="40%" padding={2} flexDirection="column">
					{/* <Follows otherUser={otherUser} /> */}
					<Follows otherUser={otherUser} />
					<Introduce otherUser={otherUser} />
				</Stack>
			</Stack>
		</Box>
	);
};

export default Profile;

export const AddFriend = () => {
	return (
		<Stack
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			sx={{
				backgroundColor: "#1976d2", // crimson
				color: "#fff",
				padding: "5px 20px",
				borderRadius: 2,
				cursor: "pointer",

				":hover": {
					backgroundColor: "#1866b4" // crimson
				}
			}}
		>
			<PersonAddOutlinedIcon sx={{ mr: 1 }} />
			<Typography fontSize={16}>Add Friend</Typography>
		</Stack>
	);
};
