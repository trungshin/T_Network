import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, CircularProgress, styled, Stack } from "@mui/material";
import RightBar from "../../components/RightBar/RightBar";
import CreatePost from "../../components/Posts/CreatePosts";
import Post from "../../components/Posts/Post";
import { getAllPosts } from "../../redux/apiRequests";
import PaginationCustomize from "../../components/Pagination";

export const HomeLayout = styled(Box)(() => ({}));

export const Body = styled(Box)(() => ({
	position: "relative",
	top: 0
}));

const Newsfeed = () => {
	const { posts, pending, postsLength } = useSelector((state) => state.post.allPosts);
	const user = useSelector((state) => state.user.user?.currentUser);
	const [page, setPage] = useState(Number(new URLSearchParams(window.location.search).get("page") || 1));
	const dispatch = useDispatch();

	useEffect(() => {
		getAllPosts(dispatch, user?.accessToken, page);
	}, [dispatch, user, page]);

	return (
		<Grid container spacing={2} width="100%">
			<Grid item xs={7.4}>
				<Stack
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					sx={{ paddingTop: 2, paddingLeft: 5, paddingRight: 5, paddingBottom: 2 }}
				>
					<CreatePost />

					<Stack width="100%" paddingTop={1}>
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
					<PaginationCustomize page={page} setPage={setPage} postsLength={postsLength} />
				</Stack>
			</Grid>

			<Grid item xs>
				<RightBar />
			</Grid>
		</Grid>
	);
};

export default Newsfeed;
