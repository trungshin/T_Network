import React from "react";
import { styled } from "@mui/material/styles";

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  marginLeft: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - 100px)`,
    marginLeft: theme.spacing(14),
  },
}));

const Container = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  position: "relative",
}));

const Content = ({ children }) => {
  return (
    <Main>
      <Container sx={{ maxWidth: "70%" }}>{children}</Container>
    </Main>
  );
}

export default Content;
