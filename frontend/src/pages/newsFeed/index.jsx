import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, CircularProgress, styled, Stack } from "@mui/material";
import SideBar from "../../components/SideBar";
import RightBar from "../../components/RightBar";
import CreatePost from "../../components/Posts/CreatePosts";
import Post from "../../components/Posts/Post";
import Header from "../../components/Header/Header";
import { getAllPosts } from "../../redux/apiRequests";

export const HomeLayout = styled(Box)(() => ({}));

export const Body = styled(Box)(() => ({
	position: "relative",
	top: 0
}));

const Newsfeed = () => {
	const { posts, pending } = useSelector((state) => state.post.allPosts);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		getAllPosts(dispatch, user?.accessToken, page);
	}, [dispatch, user, page]);

	return (
		<Box>
			<HomeLayout>
				<Header />

				<Body>
					<Grid container spacing={3}>
						<Grid item xs>
							<SideBar />
						</Grid>

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
