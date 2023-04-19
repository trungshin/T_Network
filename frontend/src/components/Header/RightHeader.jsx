import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
	Tooltip,
	Typography
} from "@mui/material";
import {
	Logout,
	PersonAdd,
	Settings,
	ChatBubbleOutlineOutlined,
	FiberManualRecord,
	MoreHoriz,
	NotificationsNone
} from "@mui/icons-material";
import { logOutUser } from "../../redux/apiRequests";

const RightHeader = () => {
	// Message
	const Message = () => {
		const [anchorEl, setAnchorEl] = React.useState(null);
		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 3 }, { id: 3 }, { id: 3 }, { id: 3 }];

		return (
			<>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						textAlign: "center",
						":hover": {
							".icon-chat": {
								color: "dodgerblue"
							}
						}
					}}
				>
					<Tooltip title="Message">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							<ChatBubbleOutlineOutlined className="icon-chat" />
						</IconButton>
					</Tooltip>
				</Box>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							"&:before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0
							}
						}
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<Stack
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
						paddingLeft={2}
						paddingRight={2}
					>
						<Typography fontSize={20} fontWeight={500}>
							Chat
						</Typography>
						<IconButton>
							<MoreHoriz />
						</IconButton>
					</Stack>

					{dummy.map((item, index) => {
						return (
							<MenuItem onClick={handleClose} key={index}>
								<Box sx={{ display: "flex", width: 300 }}>
									<Stack flexDirection="row" justifyContent="center" alignItems="center">
										<Stack justifyContent="center" alignItems="center">
											<Avatar alt="" src="" sx={{ width: 60, height: 60 }} />
										</Stack>
										<Stack flexDirection="column">
											<Typography>Ha Van Duoc</Typography>
											<Stack
												flexDirection="row"
												sx={{
													"& p": {
														fontSize: 13,
														color: "#666"
													}
												}}
											>
												<Typography>You have sent 1 photo</Typography>

												<Stack flexDirection="row" justifyContent="center" alignItems="center">
													<FiberManualRecord
														sx={{ fontSize: 4, marginLeft: 1, marginRight: 1 }}
													/>
													<Typography> 1 hour ago</Typography>
												</Stack>
											</Stack>
										</Stack>
									</Stack>
								</Box>
							</MenuItem>
						);
					})}

					<Stack justifyContent="center" alignItems="center">
						<Typography fontWeight={500} sx={{ cursor: "pointer", marginTop: 1, color: "dodgerblue" }}>
							See all
						</Typography>
					</Stack>
				</Menu>
			</>
		);
	};

	// Notification
	const Notification = () => {
		const [anchorEl, setAnchorEl] = useState(null);
		const open = Boolean(anchorEl);
		const handleClick = (e) => {
			setAnchorEl(e.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }];

		return (
			<>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						textAlign: "center",
						":hover": {
							".icon-chat": {
								color: "dodgerblue"
							}
						}
					}}
				>
					<Tooltip title="Notification">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							<NotificationsNone className="icon-chat" />
						</IconButton>
					</Tooltip>
				</Box>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							"&:before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0
							}
						}
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<Stack
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
						paddingLeft={2}
						paddingRight={2}
					>
						<Typography fontSize={20} fontWeight={500}>
							Notification
						</Typography>
						<IconButton>
							<MoreHoriz />
						</IconButton>
					</Stack>

					{dummy.map((item, index) => {
						return (
							<MenuItem onClick={handleClose} key={index}>
								<Box sx={{ display: "flex", width: 300 }}>
									<Stack flexDirection="row" justifyContent="center" alignItems="center">
										<Stack justifyContent="center" alignItems="center">
											<Avatar alt="" src="" sx={{ width: 60, height: 60 }} />
										</Stack>
										<Stack flexDirection="column">
											<Typography
												sx={{
													display: "-webkit-box",
													"-webkit-line-clamp": "1",
													textOverflow: "ellipsis",
													"-webkit-box-orient": "vertical",
													overflow: "hidden",
													fontWeight: 500
												}}
											>
												Lorem ipsum dolor sit amet conse
											</Typography>
											<Stack
												flexDirection="row"
												sx={{
													"& p": {
														fontSize: 13,
														color: "#666"
													}
												}}
											>
												<Typography>Lorem ipsum dolor sit amet conse</Typography>
											</Stack>
										</Stack>
									</Stack>
								</Box>
							</MenuItem>
						);
					})}

					<Stack justifyContent="center" alignItems="center">
						<Typography fontWeight={500} sx={{ cursor: "pointer", marginTop: 1, color: "dodgerblue" }}>
							See all
						</Typography>
					</Stack>
				</Menu>
			</>
		);
	};

	// Account Menu
	const AccountMenu = () => {
		const [anchorEl, setAnchorEl] = useState(null);
		const user = useSelector((state) => state.user.user?.currentUser);
		const open = Boolean(anchorEl);
		const dispatch = useDispatch();
		const navigate = useNavigate();

		const handleClick = (e) => {
			setAnchorEl(e.currentTarget);
		};

		const handleClose = () => {
			setAnchorEl(null);
		};

		const logOut = () => {
			logOutUser(dispatch, user?.accessToken, user?._id, navigate);
		};

		return (
			<>
				<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							<Avatar alt={user?.username} src={user?.avatar} sx={{ width: 32, height: 32 }} />
						</IconButton>
					</Tooltip>
				</Box>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							"&:before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0
							}
						}
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<Link to={`/user/${user?._id}`} className="link" style={{ textDecorationLine: "none" }}>
						<MenuItem onClick={handleClose}>
							<Avatar alt={user?.username} src={user?.avatar} />
							<Typography sx={{ color: "#000", fontWeight: 500 }}>{user?.username}</Typography>
						</MenuItem>
					</Link>
					<Divider />
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<PersonAdd fontSize="small" />
						</ListItemIcon>
						Add another account
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<Settings fontSize="small" />
						</ListItemIcon>
						Settings
					</MenuItem>
					<MenuItem onClick={logOut}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			</>
		);
	};

	return (
		<Stack flexDirection="row" justifyContent="center" alignItems="center">
			<Message />
			<Notification />
			<AccountMenu />
		</Stack>
	);
};
export default RightHeader;
