import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Mail, Notifications} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { sideBarToggle } from "../redux/navigateSlice";
import { logOutUser } from "../redux/apiRequests";
import SearchUser from "./Search";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const IconButtons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.user.user?.currentUser);
  const isOpen = useSelector((state) => state.nav.sidebar.open);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    dispatch(sideBarToggle(!isOpen));
  };

  const logOut = () => {
    logOutUser(dispatch, user?.accessToken, user?._id, navigate);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <SearchUser user={user}/>

        <IconButtons>
          <IconButton
            size="small"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
          </IconButton>
          <IconButton
            size="small"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            size="medium"
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt={user?.username}
              src={user?.avatar}
              onClick={(e) => setOpenMenu(true)}
            />
          </IconButton>
        </IconButtons>
        <UserBox onClick={(e) => setOpenMenu(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt={user?.username}
            src={user?.avatar}
          />
          <Typography variant="span">{user?.username}</Typography>
        </UserBox>
      </Toolbar>
      <Menu
        id="menu"
        aria-labelledby="button"
        open={openMenu}
        onClose={(e) => setOpenMenu(false)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink
              to={`/user/${user?._id}`}
              style={{ textDecoration: "none", color: "unset" }}
        >
          <MenuItem>Profile</MenuItem>
        </NavLink>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
