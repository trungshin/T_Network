import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { Grid, CssBaseline, Box, CircularProgress } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import CreatePost from "../../components/Posts/CreatePosts";
import { getAllPosts } from "../../redux/apiRequests";
import Post from "../../components/Posts/Post";

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

	const scrollToEnd = () => {
		console.log("this is the end of the page:", page);
		// console.log("next", !next, next);

		setPage(page + 1);

		return;
	};

	window.onscroll = function () {
		// if the page has reached to the bottom

		const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

		console.log("scrollHeight", scrollHeight);
		console.log("clientHeight", clientHeight);
		console.log("scrollTop", scrollTop);

		if (scrollTop + clientHeight >= scrollHeight - 1) {
			scrollToEnd();
		}
	};

	return (
		<Box>
			<Navbar />
			<CssBaseline />
			<Sidebar />
			<Grid container spacing={30}>
				<Grid item xs={6}>
					<Box
						flex={4}
						p={{ xs: 0, md: 2 }}
						sx={{
							position: "fixed",
							backgroundColor: "rgb(248, 249, 250)",
							width: "100%",
							height: "100%"
						}}
					>
						<Grid
							container
							sx={{
								maxWidth: "50%"
							}}
							ml={14}
							mt={-1}
							direction="column"
						>
							<CreatePost />
							<div>
								{pending && (
									<Box sx={{ display: "flex" }}>
										<CircularProgress />
									</Box>
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
							</div>
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Rightbar />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Newsfeed;
