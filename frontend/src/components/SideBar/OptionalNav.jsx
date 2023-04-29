import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import {
	GroupsOutlined,
	FlagOutlined,
	ViewTimelineOutlined,
	StorefrontOutlined,
	AddToQueueOutlined,
	CelebrationOutlined,
	SportsEsportsOutlined,
	KeyboardArrowUp,
	KeyboardArrowDown
} from "@mui/icons-material";

const OptionalNav = () => {
	const [showing, setShow] = useState(6);

	const handleClick = () => {
		// Collapse is origin
		if (showing >= dummyNav.length) {
			setShow(6);
			return;
		}

		setShow(showing + 6);
	};

	const dummyNav = [
		{ name: "Groups", icon: <GroupsOutlined />, link: "/newsfeed" },
		{ name: "Pages", icon: <FlagOutlined />, link: "/newsfeed" },
		{ name: "Most recent", icon: <ViewTimelineOutlined />, link: "/newsfeed" },
		{ name: "Watch", icon: <AddToQueueOutlined />, link: "/newsfeed" },
		{ name: "Celebrate", icon: <CelebrationOutlined />, link: "/newsfeed" },
		{ name: "Gaming", icon: <SportsEsportsOutlined />, link: "/newsfeed" },
		{ name: "Marketplace", icon: <StorefrontOutlined />, link: "/newsfeed" }
	];

	return (
		<Stack flexDirection="column" justifyContent="center" alignItems="center">
			{dummyNav.slice(0, showing).map((item, index) => {
				return (
					<Link
						to={item.link}
						className="link"
						style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
					>
						<Stack
							flexDirection="row"
							justifyContent="start"
							alignItems="center"
							width="100%"
							key={index}
							sx={{
								padding: "16px 16px",
								borderRadius: 1,
								cursor: "pointer",

								":hover": {
									backgroundColor: "#eee",

									"& svg, p": {
										color: "dodgerblue"
									}
								}
							}}
						>
							<Stack
								justifyContent="center"
								alignItems="center"
								sx={{
									"& svg": {
										marginRight: 1,
										fontSize: 25
									}
								}}
							>
								{item.icon}
							</Stack>
							<Typography color="#000" fontWeight={400}>
								{item.name}
							</Typography>
						</Stack>
					</Link>
				);
			})}

			{/* Button see more */}
			<Stack
				flexDirection="row"
				justifyContent="start"
				alignItems="center"
				width="100%"
				sx={{
					padding: "16px 16px",
					borderRadius: 1,
					cursor: "pointer",

					":hover": {
						backgroundColor: "#eee",

						"& svg, p": {
							color: "var(--color-main)"
						}
					}
				}}
				onClick={handleClick}
			>
				<Stack
					justifyContent="center"
					alignItems="center"
					sx={{
						"& svg": {
							marginRight: 1,
							fontSize: 25,
							fontWeight: 500
						}
					}}
				>
					{/* if equal is not thing show -> collapse */}
					{showing >= dummyNav.length ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
				</Stack>
				<Link className="link" to={"/newsfeed"}>
					<Typography color="#000" fontWeight={500}>
						{showing >= dummyNav.length ? "Collapse" : "See More"}
					</Typography>
				</Link>
			</Stack>
		</Stack>
	);
};

export default OptionalNav;
