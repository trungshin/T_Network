import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser} from "../../redux/apiRequests";
import { styled } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
import { Typography, Chip, Button, Stack} from "@mui/material";
import { People} from "@mui/icons-material";
import EditPage from "./EditPage";

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  paddingLeft: "20px",
  // width: "calc(100%)",
  top: "10px",
  // alignItems: "flex-end",
  // "& > *": {
  //   margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
  // },
}));
const H4 = styled("h4")(() => ({
  margin: 0,
  width: 15,
  marginLeft: 25,
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  border: `3px solid white`,
  width: theme.spacing(17),
  height: theme.spacing(17),
  boxShadow: theme.shadows[3],
}));

const UserHeader = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const currentUser = useSelector((state) => state.user.otherUser?.otherUser);
  const followings = currentUser?.followings?.find(
    (item) => item === user?._id
  );
  const followers = currentUser?.followers?.find((item) => item === user?._id);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleClickOpen = (scrollType) => {
    setOpen(true);
    setScroll(scrollType);
  };

  useEffect(() => {
    getUser(dispatch, id, user?.accessToken);
  }, [dispatch, id, user]);

  return (
    <>
      <Stack direction="row" ml={20}>
        <Avatar alt={currentUser?.username} src={currentUser?.avatar} />
        <Stack ml={5}>
          <Typography height={30} variant={"h5"}>
            {currentUser?.username}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Stack display={"flex"}>
              <H4>{currentUser?.followings?.length}</H4>
              <span>Followings</span>
            </Stack>
            <Stack>
              <H4>{currentUser?.followers?.length}</H4>
              <span>Followers</span>
            </Stack>
          </Stack>
          <span>Gender: {currentUser?.gender}</span>
          {currentUser?.mobile === "" ? null : (
            <span>Phone: {currentUser?.mobile}</span>
          )}
          {currentUser?.address === "" ? null : (
            <span>Address: {currentUser?.address}</span>
          )}
        </Stack>
        {currentUser?._id === user?._id ? null :
        followings === undefined ||
        followers === undefined ? (
          <Chip
            label="Stranger"
            color="error"
            icon={<People />}
            sx={{ ml: 20 }}
          />
        ) : followings === followers &&
          (currentUser?.followings?.length && currentUser?.followers?.length) >
            0 ? (
          <Chip
            label="Friend"
            color="primary"
            icon={<People />}
            sx={{ ml: 20 }}
          />
        ) : null}
        {currentUser?._id === user?._id && (
          <Button
            onClick={() => handleClickOpen("paper")}
            variant="contained"
            sx={{ ml: 20, height: 50 }}
          >
            Edit
          </Button>
        )}
        <EditPage open={open} setOpen={setOpen} scroll={scroll} />
      </Stack>
    </>
  );
};

export default UserHeader;
