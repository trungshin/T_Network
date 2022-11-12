import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { Grid, CssBaseline, Box, CircularProgress } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import CreatePost from "../../components/Posts/CreatePosts";
// import FullPost from "../../components/Posts/FullPost";
import { getAllPosts } from "../../redux/apiRequests";
import Post from "../../components/Posts/Post";

const Newsfeed = () => {
	// const allPosts = useSelector((state) => state.post.allPosts);

	const { posts } = useSelector((state) => state.post.allPosts);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();
	// const filteredComment = userComments?.filter(
	//   (comment) => !deleteComment.includes(comment._id)
	// );

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	const [prevPage, setPrevPage] = useState(0); // storing prev page number
	const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list

	const listInnerRef = useRef();
	const onScroll = () => {
		if (listInnerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
			if (scrollTop + clientHeight === scrollHeight) {
				setPage(page + 1);
				// This will be triggered after hitting the last element.
				// API call should be made here while implementing pagination.
			}
		}
	};

	useEffect(() => {
		if (!wasLastList && prevPage !== page) {
			getAllPosts(dispatch, user?.accessToken, setLoading, page, setWasLastList, setPrevPage);
		}
	}, [dispatch, user, setLoading, wasLastList, prevPage, setWasLastList, page, setPrevPage]);

	return (
		<Box onScroll={onScroll} ref={listInnerRef}>
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
							{/* <Grid item> */}
							<CreatePost />
							{/* </Grid> */}
							{/* <Grid item> */}
							{/* {allPosts?.pending ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : ( */}
							{/* <FullPost /> */}
							{/* )} */}

							<div>
								{posts.length > 0 &&
									posts.map((post) => (
										<Post
											key={post._id}
											post={post}
											// comments={comments}
											// setDeleteComment={setDeleteComment}
											// deleteComment={deleteComment}
										/>
									))}

								{loading && (
									<Box sx={{ display: "flex" }}>
										<CircularProgress />
									</Box>
								)}
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
