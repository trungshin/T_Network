import React from "react";
import { Typography, Stack, Avatar, IconButton } from "@mui/material";
import { VideocamOutlined, SearchOutlined, MoreHorizOutlined } from "@mui/icons-material";
import StyledBadge from "../StyleBadge";

const Friends = () => {
	const dummy = [
		{ avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj-LMfCCn7jdf18wfuFno4J1-R1CC2IMqgxtHEnaVo4A&s", name: "Hercule Poirot", link: "" },
		{ avatar: "https://i.pinimg.com/736x/5c/38/24/5c3824311d7ef477515e6c722582166c.jpg", name: "Shinichi Kudo", link: "" },
		{ avatar: "https://i.pinimg.com/736x/54/37/f3/5437f3edb80e54f263ae5e247bb011ae.jpg", name: "Ran Mori", link: "" },
		{ avatar: "https://i.pinimg.com/736x/0e/b6/5a/0eb65a09ad6a7e7d6da86ab1149ef9da.jpg", name: "Luffy", link: "" },
		{ avatar: "https://i.pinimg.com/280x280_RS/8a/3d/a6/8a3da6ee522d12423ec38ffba7cab6b9.jpg", name: "Sherlock Home", link: "" }
	];

	return (
		<Stack>
			<Stack flexDirection="row" justifyContent="space-between" alignItems="center" padding="4px 16px">
				<Typography fontWeight={500} color="#666">
					Contact
				</Typography>

				<Stack
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					sx={{
						"& svg": {
							color: "#666"
						}
					}}
				>
					<IconButton>
						<VideocamOutlined />
					</IconButton>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<MoreHorizOutlined />
					</IconButton>
				</Stack>
			</Stack>

			{dummy.slice(0, 10).map((item, index) => {
				return (
					<Stack
						key={index}
						flexDirection="row"
						alignItems="center"
						justifyContent="start"
						width="100%"
						padding="8px 16px"
						sx={{
							borderRadius: 1,
							cursor: "pointer",
							":hover": {
								backgroundColor: "#eee"
							}
						}}
					>
						<Stack marginRight={1}>
							<StyledBadge
								overlap="circular"
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								variant="dot"
							>
								<Avatar alt={item.name} src={item.avatar} />
							</StyledBadge>
						</Stack>
						<Typography>{item.name}</Typography>
					</Stack>
				);
			})}
		</Stack>
	);
};

export default Friends;
