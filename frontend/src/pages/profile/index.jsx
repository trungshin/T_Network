import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box, Stack, Avatar, Typography, Divider } from "@mui/material";
import UserHeader from "../../components/Profile/UserHeader";
import Content from "../../components/Content";
import Post from "../../components/Posts/Post";
import Header from "../../components/Header/Header";
import { getUserPost } from "../../redux/apiRequests";
import { HomeLayout, Body } from "../newsFeed";
import SideBar from "../../components/SideBar";
import { PF } from "../../__variables";

const Profile = () => {
	const { posts } = useSelector((state) => state.post.userPost);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();
	const { id } = useParams();

	// console.log('user', user)
	// console.log('posts', posts)

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
						src={`${PF}/assets/images/groups-default-cover-photo-2x.png`}
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
					/>
					<Stack justifyContent="end" alignItems="center" height="100%">
						<Typography fontSize={24} fontWeight={500}>
							Nguyễn Phan Việt Trung
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
					<Yourself />
					<Introduce />
				</Stack>
			</Stack>
		</Box>
	);
};

export default Profile;

const Yourself = () => {
	return (
		<Stack flexDirection="column" marginBottom={2}>
			<Box
				sx={{
					boxShadow: "0 0 1.5px 1px rgba(0,0,0,0.2)",
					borderRadius: 1,
					paddingTop: 1,
					paddingLeft: 2,
					paddingRight: 2,
					paddingBottom: 1,
					pointerEvents: "none"
				}}
			>
				<Typography
					fontSize={18}
					fontWeight={500}
					paddingBottom={1}
					marginBottom={1}
					borderBottom="2px solid #ccc"
				>
					Nguyen Phan Viet Trung
				</Typography>

				<Stack
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					marginTop={2}
					marginBottom={2}
				>
					<Typography sx={{ fontWeight: 500 }}>Followings</Typography>
					<Typography>5</Typography>
				</Stack>
				<Stack
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					marginTop={2}
					marginBottom={2}
				>
					<Typography sx={{ fontWeight: 500 }}>Followings</Typography>
					<Typography>5</Typography>
				</Stack>
				<Stack
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					marginTop={2}
					marginBottom={2}
				>
					<Typography sx={{ fontWeight: 500 }}>Followings</Typography>
					<Typography>5</Typography>
				</Stack>
			</Box>
		</Stack>
	);
};

const Introduce = () => {
	return (
		<Stack flexDirection="column">
			<Box
				sx={{
					boxShadow: "0 0 1.5px 1px rgba(0,0,0,0.2)",
					borderRadius: 1,
					paddingTop: 1,
					paddingLeft: 2,
					paddingRight: 2,
					paddingBottom: 1
				}}
			>
				<Typography fontSize={18} fontWeight={500}>
					Introduce
				</Typography>

				<Stack
					justifyContent="center"
					alignItems="center"
					sx={{
						borderRadius: 1,
						backgroundColor: "#eee",
						padding: "7px",
						marginTop: 1,
						marginBottom: 2,
						cursor: "pointer",
						transition: "all .3s ease",
						// boxShadow: "0 0 0.5px 1px rgba(0,0,0,0.1)",

						":hover": {
							backgroundColor: "#ddd"
						}
					}}
				>
					<Typography fontSize={14} fontWeight={500}>
						Thêm tiểu sử
					</Typography>
				</Stack>
				<Stack
					justifyContent="center"
					alignItems="center"
					sx={{
						borderRadius: 1,
						backgroundColor: "#eee",
						padding: "7px",
						marginTop: 1,
						marginBottom: 2,
						cursor: "pointer",
						transition: "all .3s ease",
						// boxShadow: "0 0 0.5px 1px rgba(0,0,0,0.1)",

						":hover": {
							backgroundColor: "#ddd"
						}
					}}
				>
					<Typography fontSize={14} fontWeight={500}>
						Thêm tiểu sử
					</Typography>
				</Stack>
				<Stack
					justifyContent="center"
					alignItems="center"
					sx={{
						borderRadius: 1,
						backgroundColor: "#eee",
						padding: "7px",
						marginTop: 1,
						marginBottom: 2,
						cursor: "pointer",
						transition: "all .3s ease",
						// boxShadow: "0 0 0.5px 1px rgba(0,0,0,0.1)",

						":hover": {
							backgroundColor: "#ddd"
						}
					}}
				>
					<Typography fontSize={14} fontWeight={500}>
						Thêm tiểu sử
					</Typography>
				</Stack>
				<Stack
					justifyContent="center"
					alignItems="center"
					sx={{
						borderRadius: 1,
						backgroundColor: "#eee",
						padding: "7px",
						marginTop: 1,
						marginBottom: 2,
						cursor: "pointer",
						transition: "all .3s ease",
						// boxShadow: "0 0 0.5px 1px rgba(0,0,0,0.1)",

						":hover": {
							backgroundColor: "#ddd"
						}
					}}
				>
					<Typography fontSize={14} fontWeight={500}>
						Thêm tiểu sử
					</Typography>
				</Stack>
			</Box>
		</Stack>
	);
};
