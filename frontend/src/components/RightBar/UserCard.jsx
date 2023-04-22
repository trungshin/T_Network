import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
	IconButton,
	Avatar,
	Stack,
	Box,
	Typography,
	Tooltip,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { deleteUser } from "../../redux/apiRequests";
import FollowBtn from "../FollowBtn";
import StyledBadge from "../StyleBadge";

const UserCard = ({ user }) => {
	const [open, setOpen] = useState(false);
	const currentUser = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();

	const handleDeleteUser = (id) => {
		setOpen(false);
		deleteUser(dispatch, currentUser?.accessToken, id);
		window.location.reload();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{currentUser?._id === user?._id ? null : (
				<Stack
					sx={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						padding: 1,
						borderRadius: 1,
						cursor: "pointer",

						":hover": {
							backgroundColor: "#ddd",

							".userName": {
								transition: "all .3s ease",
								color: "dodgerblue !important"
							}
						}
					}}
				>
					<Stack flexDirection="row" justifyContent="center" alignItems="center">
						<Box classNames="avatar" sx={{ marginRight: 1 }}>
							<Link to={`/user/${user._id}`} className="link">
								<StyledBadge
									overlap="circular"
									anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
									variant="dot"
								>
									<Avatar alt="" src={user.avatar} />
								</StyledBadge>
							</Link>
						</Box>

						<Stack flexDirection="column" flex={1}>
							<Stack flexDirection="row">
								<Link to={`/user/${user._id}`} className="link">
									<Typography sx={{ marginRight: 1 }} className="userName">
										{user.username}
									</Typography>
								</Link>
								<FollowBtn user={user} />
							</Stack>

							<Link to={`/user/${user._id}`} className="link">
								<Typography>{moment(user.createdAt).fromNow()}</Typography>
							</Link>
						</Stack>
					</Stack>

					{currentUser?.admin && (
						<>
							<Stack>
								<Tooltip title="Remove User">
									<IconButton onClick={handleClickOpen}>
										<Close />
									</IconButton>
								</Tooltip>
							</Stack>

							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby="cfm-remove-user-title"
								aria-describedby="cfm-remove-user-desc"
							>
								<DialogTitle id="cfm-remove-user-title">{"Confirm Remove User"}</DialogTitle>
								<DialogContent>
									<DialogContentText id="cfm-remove-user-desc">
										Do you want to remove this user?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button
										sx={{
											color: "#fff",
											backgroundColor: "#1976d2",
											":hover": {
												backgroundColor: "#1866b4"
											}
										}}
										onClick={handleClose}
									>
										Cancel
									</Button>
									<Button
										sx={{
											color: "#fff",
											backgroundColor: "crimson",
											":hover": {
												backgroundColor: "#f56991"
											}
										}}
										onClick={() => handleDeleteUser(user?._id)}
										autoFocus
									>
										Remove
									</Button>
								</DialogActions>
							</Dialog>
						</>
					)}
				</Stack>
			)}
		</>
	);
};

export default UserCard;
