import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Toolbar, IconButton, Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { sideBarToggle } from "../redux/navigateSlice";
import { logOutUser } from "../redux/apiRequests";
import SearchUser from "./Search";
import Logout from "@mui/icons-material/Logout";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1
}));

const NavBar = () => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const user = useSelector((state) => state.user.user?.currentUser);
	const isOpen = useSelector((state) => state.nav.sidebar.open);
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const toggleDrawer = () => {
		dispatch(sideBarToggle(!isOpen));
	};

	const logOut = () => {
		logOutUser(dispatch, user?.accessToken, user?._id, navigate);
	};

	return (
		<AppBar position="sticky">
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
					<MenuIcon />
				</IconButton>

				<SearchUser user={user} />

				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="medium"
						sx={{ ml: 2 }}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }} alt={user?.username} src={user?.avatar} />
					</IconButton>
				</Tooltip>
			</Toolbar>
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
				<NavLink to={`/user/${user?._id}`} style={{ textDecoration: "none", color: "unset" }}>
					<MenuItem>
						<Avatar sx={{ width: 32, height: 32 }} alt={user?.username} src={user?.avatar} />{" "}
						{user?.username}
					</MenuItem>
				</NavLink>
				<MenuItem onClick={logOut}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</AppBar>
	);
};

export default NavBar;
