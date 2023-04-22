import React from "react";
import { Typography, Stack, Avatar, IconButton } from "@mui/material";
import { VideocamOutlined, SearchOutlined, MoreHorizOutlined } from "@mui/icons-material";
import StyledBadge from "../StyleBadge";

const Friends = () => {
	const dummy = [
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" }
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
								<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
							</StyledBadge>
						</Stack>
						<Typography>Ha Van Duoc</Typography>
					</Stack>
				);
			})}
		</Stack>
	);
};

export default Friends;
