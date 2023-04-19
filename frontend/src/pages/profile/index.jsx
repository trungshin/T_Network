import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Grid, Box, Stack, Typography } from "@mui/material";
import { PersonOutlined, NewspaperOutlined } from "@mui/icons-material";
import UserHeader from "../../components/Profile/UserHeader";
import Content from "../../components/Content";
import Post from "../../components/Posts/Post";
import Header from "../../components/Header/Header";
import { getUserPost } from "../../redux/apiRequests";
import { HomeLayout, Body } from "../newsFeed";

const Profile = () => {
	const { posts } = useSelector((state) => state.post.userPost);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		getUserPost(dispatch, user?.accessToken, id);
	}, [dispatch, user, id]);

	return (
		<Box>
			<HomeLayout>
				<Header />

				<Body>
					<Grid container spacing={3}>
						{/* Side Bar */}
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
			</HomeLayout>
		</Box>
	);
};

export default Profile;

export const SideBar = () => {
	const user = useSelector((state) => state.user.user?.currentUser);

	const dummySidebar = [
		{ id: 1, name: "Newsfeed", icon: <NewspaperOutlined />, link: "/newsfeed" },
		{ id: 1, name: "Profile", icon: <PersonOutlined />, link: `/user/${user?._id}` }
	];

	return (
		<Box
			sx={{
				position: "sticky",
				top: 80,
				left: 0,
				width: "100%",
				padding: 2,

				"& svg": {
					color: "#666"
				}
			}}
		>
			<Stack flexDirection="column">
				{dummySidebar.map((item, index) => {
					return (
						<Link to={item.link} key={index} className="link">
							<Stack
								flexDirection="row"
								justifyContent="start"
								alignItems="center"
								sx={{
									height: 50,
									padding: 1,
									borderRadius: 1,

									":hover": {
										backgroundColor: "#ddd"
									}
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignContent: "center",
										justifyContent: "center",
										marginRight: 1,
										color: "#666"
									}}
								>
									{item.icon}
								</Box>
								<Box
									sx={{
										display: "flex",
										alignContent: "center",
										justifyContent: "center",
										color: "#666",
										textDecoration: "none"
									}}
								>
									<Typography>{item.name}</Typography>
								</Box>
							</Stack>
						</Link>
					);
				})}
			</Stack>
		</Box>
	);
};
