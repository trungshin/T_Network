import React, { useEffect, useState } from "react";
import { Card, CardHeader, IconButton, Avatar, Button } from "@mui/material";
import FollowBtn from "./FollowBtn";
// import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { deleteComment } from "../redux/apiRequests";
import moment from "moment";
// import { MoreVert, DeleteOutlined } from "@mui/icons-material";

const UserCard = ({ user }) => {
  const currentUser = useSelector((state) => state.user.user?.currentUser);
  //   const dispatch = useDispatch();

  return (
    <>
      {currentUser?._id === user?._id ? null : (
        <Card style={{ margin: 5, border: "solid 1px", height: 66 }}>
          <CardHeader
            style={{ padding: 0 }}
            avatar={
              <NavLink to={`/user/${user._id}`}>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Avatar alt="Remy Sharp" src={user.avatar} />
                </IconButton>
              </NavLink>
            }
            action={<FollowBtn user={user} marginProps={15} />}
            title={user.username}
            subheader={moment(user.createdAt).fromNow()}
          />
        </Card>
      )}
    </>
  );
};

export default UserCard;
