import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Stack, Avatar, Typography, Chip } from "@mui/material";
import Post from "../../components/Posts/Post";
import { getUserPost } from "../../redux/apiRequests";
import { getUser } from "../../redux/apiRequests";
import EditPage from "../../components/Profile/EditPage";
import Introduce from "../../components/Profile/Introduce";
import Follows from "../../components/Profile/Follows";
import { CreateOutlined, People, PersonAddOutlined } from "@mui/icons-material";
import CreatePost from "../../components/Posts/CreatePosts";
import { followUser, unFollowUser } from "../../redux/apiRequests";

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
								<Chip label="Stranger" color="error" icon={<People />} />
							) : followings === followers &&
							  (otherUser?.followings?.length && otherUser?.followers?.length) > 0 ? (
								<Chip label="Friend" color="primary" icon={<People />} />
							) : null}
							{otherUser?._id === user?._id ? null : <AddFriend otherUser={otherUser} user={user} />}

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
										<CreateOutlined sx={{ fontSize: 19 }} />
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

					{posts?.length > 0 ? (
						posts?.map((post) => {
							return <Box pl={2}> 
								<Post key={post._id} post={post} />
							</Box>;
						})
					) : (
						<Stack justifyContent="center" alignItems="center">
							<Typography fontSize={24} fontWeight={500}>No posts</Typography>
						</Stack>
					)}
				</Stack>

				<Stack width="40%" p={2} flexDirection="column">
					{/* <Follows otherUser={otherUser} /> */}
					<Follows otherUser={otherUser} />
					<Introduce otherUser={otherUser} />
				</Stack>
			</Stack>
		</Box>
	);
};

export default Profile;

export const AddFriend = ({ otherUser, user }) => {
	const [followed, setFollowed] = useState(otherUser?.followers?.find((item) => item === user?._id));

	const dispatch = useDispatch();

	// console.log(otherUser?.followers?.find((item) => item === user?._id));

	useEffect(() => {
		if (otherUser?.followers?.find((item) => item === user?._id) === user?._id) {
			setFollowed(user?._id);
		} else {
			setFollowed(undefined);
		}
	}, [otherUser?.followers, user?._id]);

	const handleFollowAndUnFollow = () => {
		const userId = {
			userId: user?._id
		};
		if (followed === user?._id) {
			setFollowed(undefined);
			unFollowUser(dispatch, otherUser?._id, userId, user?.accessToken);
		} else {
			setFollowed(user?._id);
			followUser(dispatch, otherUser?._id, userId, user?.accessToken);
		}
	};

	// const handleUnFollow = () => {
	// 	setFollowed(false);
	// 	const userId = {
	// 		userId: user?._id
	// 	};
	// 	unFollowUser(dispatch, user?._id, userId, user?.accessToken);
	// };

	return (
		<Stack
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			sx={{
				backgroundColor: `${followed === user?._id ? "crimson" : "#1976d2"}`, // crimson
				color: "#fff",
				padding: "5px 20px",
				borderRadius: 2,
				cursor: "pointer",

				":hover": {
					backgroundColor: `${followed === user?._id ? "#f56991" : "#1866b4"}` // #f56991
				}
			}}
			onClick={handleFollowAndUnFollow}
		>
			<PersonAddOutlined sx={{ mr: 1 }} />
			<Typography fontSize={16}>{followed === user?._id ? "UnFollow" : "Follow"}</Typography>
		</Stack>
	);
};
