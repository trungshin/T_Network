import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { Grid, CssBaseline, Box, CircularProgress, styled, Stack, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import CreatePost from "../../components/Posts/CreatePosts";
import { getAllPosts, getAllUsers } from "../../redux/apiRequests";
import Post from "../../components/Posts/Post";
import { Link } from "react-router-dom";
import { PersonOutlined, NewspaperOutlined } from "@mui/icons-material";
import UserCard from "../../components/UserCard";

const Newsfeed = () => {
	const { posts, pending } = useSelector((state) => state.post.allPosts);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	// const [prevPage, setPrevPage] = useState(0); // storing prev page number
	// const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list

	// const listInnerRef = useRef();
	// const onScroll = () => {
	// 	if (listInnerRef.current) {
	// 		const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
	// 		if (scrollTop + clientHeight === scrollHeight) {
	// 			setPage(page + 1);
	// 			// This will be triggered after hitting the last element.
	// 			// API call should be made here while implementing pagination.
	// 		}
	// 	}
	// };

	useEffect(() => {
		// if (!wasLastList && prevPage !== page) {
		getAllPosts(dispatch, user?.accessToken, page);
		// }
	}, [dispatch, user, page]);

	//infinite scroll

	// const scrollToEnd = () => {
	// 	console.log("this is the end of the page:", page);
	// 	// console.log("next", !next, next);

	// 	setPage(page + 1);

	// 	return;
	// };

	// window.onscroll = function () {
	// 	// if the page has reached to the bottom

	// 	const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

	// 	console.log("scrollHeight", scrollHeight);
	// 	console.log("clientHeight", clientHeight);
	// 	console.log("scrollTop", scrollTop);

	// 	if (scrollTop + clientHeight >= scrollHeight - 1) {
	// 		scrollToEnd();
	// 	}
	// };

	return (
		// <Box>
		// 	<Navbar />

		// 	<CssBaseline />

		// 	<Sidebar />

		// 	<Grid container spacing={30}>
		// 		<Grid item xs={6}>
		// 			<Box
		// 				flex={4}
		// 				p={{ xs: 0, md: 2 }}
		// 				sx={{
		// 					position: "fixed",
		// 					backgroundColor: "rgb(248, 249, 250)",
		// 					width: "100%",
		// 					height: "100%"
		// 				}}
		// 			>
		// 				<Grid
		// 					container
		// 					sx={{
		// 						maxWidth: "50%"
		// 					}}
		// 					ml={14}
		// 					mt={-1}
		// 					direction="column"
		// 				>
		// 					<CreatePost />
		// 					<div>
		// 						{pending && (
		// 							<Box sx={{ display: "flex" }}>
		// 								<CircularProgress />
		// 							</Box>
		// 						)}
		// 						{posts.map((post) => (
		// 							<Post
		// 								key={post._id}
		// 								post={post}
		// 								// comments={comments}
		// 								// setDeleteComment={setDeleteComment}
		// 								// deleteComment={deleteComment}
		// 							/>
		// 						))}
		// 					</div>
		// 				</Grid>
		// 			</Box>
		// 		</Grid>
		// 		<Grid item xs={6}>
		// 			<Rightbar />
		// 		</Grid>
		// 	</Grid>
		// </Box>

		<Box>
			<HomeLayout>
				<Header />

				<Body>
					<Grid container spacing={3}>
						{/* Side Bar */}
						<Grid item xs>
							<SideBar />
						</Grid>

						{/* Feed */}
						<Grid item xs={5}>
							<Stack
								flexDirection="column"
								justifyContent="center"
								alignItems="center"
								sx={{ width: "100%", padding: 2 }}
							>
								<CreatePost />

								<Stack width="100%">
									{pending && (
										<Stack justifyContent="center" alignItems="center" height={100}>
											<CircularProgress />
										</Stack>
									)}
									{posts.map((post) => (
										<Post
											key={post._id}
											post={post}
											// comments={comments}
											// setDeleteComment={setDeleteComment}
											// deleteComment={deleteComment}
										/>
									))}
								</Stack>
							</Stack>
						</Grid>

						{/* RightBar */}
						<Grid item xs>
							<RightBar />
						</Grid>
					</Grid>
				</Body>
			</HomeLayout>
		</Box>
	);
};

export default Newsfeed;

export const HomeLayout = styled(Box)(() => ({}));

export const Body = styled(Box)(() => ({}));

export const Header = () => {
	return (
		<Box sx={{ marginBottom: 2, position: "sticky", top: 0, left: 0, zIndex: 99 }}>
			<Navbar />
			<CssBaseline />
		</Box>
	);
};

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

export const RightBar = () => {
	const { users } = useSelector((state) => state.user.allUsers);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		getAllUsers(dispatch, user?.accessToken);
	}, [dispatch, user]);

	return (
		<Box sx={{ position: "sticky", top: 80, right: 0, padding: 2 }}>
			<Box className="section">
				<Box sx={{ marginBottom: 1, paddingLeft: 1 }}>
					<Typography fontSize={18} color="#666" fontWeight={500}>
						Discover people
					</Typography>
				</Box>

				<Stack flexDirection="column">
					{users.length > 0 && users?.map((user) => <UserCard key={user._id} user={user} />)}
				</Stack>
			</Box>
		</Box>
	);
};
