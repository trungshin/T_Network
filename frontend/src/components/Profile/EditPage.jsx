import React, { useState } from "react";
import {
	Button,
	useMediaQuery,
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	TextField,
	DialogActions,
	Stack,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../redux/apiRequests";
import { useTheme, styled } from "@mui/material/styles";
import { Close, PhotoCamera } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MuiAvatar from "@mui/material/Avatar";

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
	border: `3px solid white`,
	width: theme.spacing(17),
	height: theme.spacing(17),
	boxShadow: theme.shadows[3]
}));

const EditPage = ({ open, scroll, setOpen }) => {
	const user = useSelector((state) => state.user.user?.currentUser);
	const otherUser = useSelector((state) => state.user.otherUser?.otherUser);
	const [gender, setGender] = useState(user?.gender);
	const [mobile, setMobile] = useState(user?.mobile);
	const [address, setAddress] = useState(user?.address);
	const [avatar, setAvatar] = useState(user?.avatar);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const handleChange = (e) => {
		setGender(e.target.value);
	};
	const dispatch = useDispatch();

	const { id } = useParams();

	const handleEdit = (e) => {
		e.preventDefault();
		const updatedUser = {
			gender: gender,
			mobile: mobile,
			address: address,
			avatar: avatar
		};
		updateUser(dispatch, updatedUser, id, user?.accessToken);
		handleClose();
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setAvatar(reader.result);
		};
	};

	return (
		<>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Edit Profile"}
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500]
						}}
					>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers={scroll === "paper"}>
					<Stack direction="column" spacing={2}>
						<div>
							<Avatar alt="hello" src={avatar} />
							<span>
								<input
									style={{ display: "none" }}
									accept="image/*"
									id="icon-button-file"
									type="file"
									onChange={handleFileInputChange}
								/>
								<label htmlFor="icon-button-file">
									<IconButton color="primary" aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
								</label>
							</span>
						</div>
						<FormControl>
							<FormLabel>Gender</FormLabel>
							<RadioGroup row defaultValue="male" value={gender} onChange={handleChange}>
								<FormControlLabel value="female" control={<Radio />} label="Female" />
								<FormControlLabel value="male" control={<Radio />} label="Male" />
							</RadioGroup>
							<FormLabel>Phone</FormLabel>
							<PhoneInput country={"vn"} value={otherUser?.mobile} onChange={(e) => setMobile(e)} />
						</FormControl>
						<TextField
							label="Address"
							variant="outlined"
							defaultValue={otherUser?.address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button autoFocus variant="contained" onClick={handleEdit}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditPage;
