import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../redux/apiRequests";
import UserCard from "./UserCard";

const Rightbar = () => {
  const { users } = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user?.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers(dispatch, user?.accessToken);
  }, [dispatch, user]);

  return (
    <Box position="fixed" width={300}>
      {users.length > 0 &&
        users?.map((user) => <UserCard key={user._id} user={user} />)}
    </Box>
  );
};

export default Rightbar;
