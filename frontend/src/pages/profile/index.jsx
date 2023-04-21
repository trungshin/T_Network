import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box, Stack, Avatar, Typography, Divider, Chip, Button } from "@mui/material";
import UserHeader from "../../components/Profile/UserHeader";
import Post from "../../components/Posts/Post";
import { getUserPost } from "../../redux/apiRequests";
import { getUser } from "../../redux/apiRequests";
import { People } from "@mui/icons-material";
import EditPage from "../../components/Profile/EditPage";
import Introduce from "../../components/Profile/Introduce";
import Follows from "../../components/Profile/Follows";

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
			{/* <HomeLayout>
				<Header />

				<Body>
					<Grid container spacing={3}>
						<Grid item xs={2}>
							<SideBar />
						</Grid>

						<Grid item xs={5}>
							<Box
								sx={{
									position: "fixed",
									backgroundColor: "rgb(248, 249, 250)",
									width: "100%",
									height: "100%"
								}}
							>
								<Content>
									<UserHeader />
									{posts?.map((post) => {
										return <Post key={post._id} post={post} />;
									})}
								</Content>
							</Box>
						</Grid>
					</Grid>
				</Body>
			</HomeLayout> */}

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
								boxShadow: "0 1px 5px rgba(0,0,0,0.2)"
							}}
							alt={otherUser?.username}
							src={otherUser?.avatar}
						/>

						{otherUser?._id === user?._id ? null : followings === undefined || followers === undefined ? (
							<Chip label="Stranger" color="error" icon={<People />} />
						) : followings === followers &&
						  (otherUser?.followings?.length && otherUser?.followers?.length) > 0 ? (
							<Chip label="Friend" color="primary" icon={<People />} />
						) : null}

						{otherUser?._id === user?._id && (
							<Button
								onClick={() => handleClickOpen("paper")}
								variant="contained"
								sx={{ ml: 20, height: 50 }}
							>
								Edit
							</Button>
						)}
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
				<Stack width="70%" flexDirection="column" paddingTop={2} paddingRight={2}>
					{posts?.map((post) => {
						return <Post key={post._id} post={post} />;
					})}
				</Stack>

				<Stack width="40%" padding={2} flexDirection="column">
					<Follows otherUser={otherUser} />
					<Introduce otherUser={otherUser} />
				</Stack>
			</Stack>
		</Box>
	);
};

export default Profile;
