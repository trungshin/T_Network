import {
	Avatar,
	Box,
	Container,
	Divider,
	Grid,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Popover,
	Popper,
	Stack,
	Tooltip,
	Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { logOutUser } from "../redux/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const Navbar_v2 = () => {
	return (
		<Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
			<Container maxWidth="xl">
				<Grid container>
					<Grid item xs>
						<Stack justifyContent="center" alignItems="start" width="100%" height="100%">
							<Logo />
						</Stack>
					</Grid>
					<Grid item xs={5}>
						<Stack justifyContent="center" alignItems="center" width="100%" height="100%">
							<Search />
						</Stack>
					</Grid>
					<Grid item xs>
						<Stack justifyContent="center" alignItems="end" width="100%" height="100%">
							<RightNavbar />
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Navbar_v2;

export const RightNavbar = () => {
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
			<React.Fragment>
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
							<ChatBubbleOutlineOutlinedIcon className="icon-chat" />
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
							<MoreHorizIcon />
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
											<Typography>Hà Văn Được</Typography>
											<Stack
												flexDirection="row"
												sx={{
													"& p": {
														fontSize: 13,
														color: "#666"
													}
												}}
											>
												<Typography>Bạn đã gửi 1 ảnh</Typography>

												<Stack flexDirection="row" justifyContent="center" alignItems="center">
													<FiberManualRecordIcon
														sx={{ fontSize: 4, marginLeft: 1, marginRight: 1 }}
													/>
													<Typography> 1 giờ</Typography>
												</Stack>
											</Stack>
										</Stack>
									</Stack>
								</Box>
							</MenuItem>
						);
					})}

					<Stack justifyContent="center" alignItems="center">
						<Typography color="dodgerblue" fontWeight={500} sx={{ cursor: "pointer", marginTop: 1 }}>
							Xem tất cả
						</Typography>
					</Stack>
				</Menu>
			</React.Fragment>
		);
	};

	// Notification
	const Notification = () => {
		const [anchorEl, setAnchorEl] = React.useState(null);
		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }];

		return (
			<React.Fragment>
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
							<NotificationsNoneIcon className="icon-chat" />
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
							<MoreHorizIcon />
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
												<Typography>lsjkfksdjflsdfklsjkf</Typography>
											</Stack>
										</Stack>
									</Stack>
								</Box>
							</MenuItem>
						);
					})}

					<Stack justifyContent="center" alignItems="center">
						<Typography color="dodgerblue" fontWeight={500} sx={{ cursor: "pointer", marginTop: 1 }}>
							Xem tất cả
						</Typography>
					</Stack>
				</Menu>
			</React.Fragment>
		);
	};

	// Account Menu
	const AccountMenu = () => {
		const [anchorEl, setAnchorEl] = React.useState(null);
		const user = useSelector((state) => state.user.user?.currentUser);
		const open = Boolean(anchorEl);
		const dispatch = useDispatch();
		const navigate = useNavigate();

		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};

		const handleClose = () => {
			setAnchorEl(null);
		};

		const logOut = () => {
			logOutUser(dispatch, user?.accessToken, user?._id, navigate);
		};

		return (
			<React.Fragment>
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
			</React.Fragment>
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

export const Logo = () => {
	return (
		<Stack justifyContent="center" alignItems="center">
			<Link to="/newsfeed" className="link">
				<Typography fontSize={35} fontWeight={500} color="var(--color-main)" sx={{ cursor: "pointer" }}>
					T-Network
				</Typography>
			</Link>
		</Stack>
	);
};

export const Search = () => {
	const [result, setResult] = useState([]);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleFocus = (event) => {
		console.log("focus");
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			sx={{
				position: "relative",
				backgroundColor: "#f0f2f5",
				padding: "5px",
				borderRadius: 15,
				boxShadow: "0 1px 1px rgba(0,0,0,0.2)",

				":hover": {
					".icon-search svg": {
						color: "var(--color-main)"
					}
				},

				".icon-search": {
					position: "absolute",
					left: 0,
					top: 0,
					width: 42,
					height: 42,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
					backgroundColor: "transparent",
					paddingLeft: 1,
					paddingRight: 1,

					"& svg": {
						color: "#666"
					}
				},

				".input input": {
					border: "none",
					outline: "none",
					width: 480,
					height: 30,
					lineHeight: 25,
					fontSize: 17,
					paddingLeft: "45px",
					paddingRight: 3,
					backgroundColor: "transparent",

					"::placeholder": {
						fontSize: 14
					}
				}
			}}
		>
			<Stack flexDirection="row" justifyContent="center" alignItems="center">
				<Box className="icon-search">
					<SearchOutlinedIcon />
				</Box>

				<Box className="input">
					<input placeholder="Tìm kiếm trên T-Network" onFocus={handleFocus} />
				</Box>

				<Popper
					sx={{
						backgroundColor: "#fff",
						zIndex: 100,
						boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
						width: 550,
						borderRadius: 1
					}}
					anchorEl={anchorEl}
					id="account-menu-search"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<Stack
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
						sx={{ paddingLeft: 2, paddingTop: 2, paddingRight: 2, paddingBottom: 1 }}
					>
						<Typography fontWeight={500}>Tìm kiếm gần đây</Typography>
						<Typography color="dodgerblue" sx={{ cursor: "pointer" }}>
							Chỉnh sửa
						</Typography>
					</Stack>

					<MenuItem
						onClick={handleClose}
						sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
					>
						<Typography>Profile</Typography>
						<IconButton>
							<CloseIcon fontSize="small" />
						</IconButton>
					</MenuItem>
					<MenuItem
						onClick={handleClose}
						sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
					>
						<Typography>Profile</Typography>
						<IconButton>
							<CloseIcon fontSize="small" />
						</IconButton>
					</MenuItem>
					<MenuItem
						onClick={handleClose}
						sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
					>
						<Typography>Profile</Typography>
						<IconButton>
							<CloseIcon fontSize="small" />
						</IconButton>
					</MenuItem>
					<MenuItem
						onClick={handleClose}
						sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
					>
						<Typography>Profile</Typography>
						<IconButton>
							<CloseIcon fontSize="small" />
						</IconButton>
					</MenuItem>
				</Popper>
			</Stack>
		</Box>
	);
};
