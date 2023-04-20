import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import UserHeader from "../../components/Profile/UserHeader";
import Content from "../../components/Content";
import Post from "../../components/Posts/Post";
import Header from "../../components/Header/Header";
import { getUserPost } from "../../redux/apiRequests";
import { HomeLayout, Body } from "../newsFeed";
import SideBar from "../../components/SideBar";

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
