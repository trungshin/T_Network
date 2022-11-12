import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { ListItemText, ListItemIcon, ListItemButton, List, Tooltip } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Person, Feed } from "@mui/icons-material";
import { sideBarToggle } from "../redux/navigateSlice";

const drawerWidth = 180;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: "hidden"
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 10px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 10px)`
	}
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme)
	})
}));

const Sidebar = () => {
	const user = useSelector((state) => state.user.user?.currentUser);

	const menuItems = [
		{
			name: "Newsfeed",
			icon: <Feed />,
			path: "/newsfeed"
		},
		{
			name: "Profile",
			icon: <Person />,
			path: `/user/${user?._id}`
		}
	];

	const dispatch = useDispatch();
	const isOpen = useSelector((state) => state.nav.sidebar.open);
	const toggleDrawer = () => {
		dispatch(sideBarToggle(false));
	};

	return (
		<Drawer
			variant="permanent"
			open={isOpen}
			onClose={toggleDrawer}
			sx={{
				boxShadow: "0 0 6px hsl(210 14% 90%)"
			}}
		>
			<DrawerHeader />
			{menuItems.map((list, index) => (
				<List key={index}>
					<NavLink to={list.path} style={{ textDecoration: "none", color: "unset" }}>
						<Tooltip title={list.name} placement="right" arrow>
							<ListItemButton
								key={list.name}
								sx={{
									minHeight: 48,
									justifyContent: isOpen ? "initial" : "center"
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: isOpen ? 3 : "auto",
										justifyContent: "center",
										color: "#1976d2"
									}}
								>
									{list.icon}
								</ListItemIcon>
								<ListItemText primary={list.name} sx={{ opacity: isOpen ? 1 : 0 }} />
							</ListItemButton>
						</Tooltip>
					</NavLink>
				</List>
			))}
		</Drawer>
	);
};

export default Sidebar;
