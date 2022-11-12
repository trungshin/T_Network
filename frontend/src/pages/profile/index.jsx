import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Grid, Box, CssBaseline } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/Profile/UserHeader";
import Content from "../../components/Content";
import Post from "../../components/Posts/Post";
import { getUserPost } from "../../redux/apiRequests";

const Profile = () => {
	const { posts } = useSelector((state) => state.post.userPost);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		getUserPost(dispatch, user?.accessToken, id);
	}, [dispatch, user, id]);

	return (
		<div>
			<Navbar />
			<CssBaseline />
			<Grid container>
				<Grid item>
					<Sidebar />
				</Grid>
				<Grid item>
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
		</div>
	);
};

export default Profile;
