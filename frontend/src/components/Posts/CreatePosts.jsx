import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, styled } from "@mui/material/styles";
import {
  Card,
  Avatar,
  CardContent,
  Button,
  IconButton,
  Typography,
  TextField,
  Tooltip,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Close, PhotoCamera } from "@mui/icons-material";
import { createPost } from "../../redux/apiRequests";
import { createPostToggle } from "../../redux/navigateSlice";

const Input = styled("input")({
  display: "none",
});

const Img = styled("img")(({ theme }) => ({
  borderRadius: "5px",
  display: "block",
  height: 150,
  [theme.breakpoints.down("sm")]: {
    height: 50,
  },
}));

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.currentUser);
  // const fullPost = useSelector((state) => state.nav.fullPost);

  const handleClickOpen = (scrollType) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = () => {
    if (!images) {
      const newPost = {
        userId: user?._id,
        description: description,
      };
      createPost(dispatch, user?.accessToken, newPost, createPostToggle);
    } else if (images) {
      const newPost = {
        userId: user?._id,
        description: description,
        img: images,
      };
      createPost(dispatch, user?.accessToken, newPost, createPostToggle);
    }
    setImages("");
    handleClose();
    window.location.reload();
  };

  // const handleMultipleImages = (e) => {
  //   const targetFiles = e.target.files[0];
  //   // const targetFilesObject = [...targetFiles];
  //   // const imagesArray = targetFilesObject.map((file) => {
  //   //   return URL.createObjectURL(file);
  //   // });
  //   setImages(URL.createObjectURL(targetFiles));
  // };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImages(reader.result);
    };
  };

  return (
    <Card
      sx={{
        borderRadius: "14px",
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      <CardContent sx={{ display: "flex" }}>
        <IconButton
          size="small"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt={user?.username} src={user?.avatar} />
        </IconButton>
        <Button
          variant="outlined"
          onClick={() => handleClickOpen("paper")}
          size="large"
          sx={{
            ml: "5px",
            width: "100%",
            justifyContent: "left",
            borderRadius: 5,
          }}
        >
          <Typography>Write something here...</Typography>
        </Button>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create Post"}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar alt={user?.username} src={user?.avatar} />
              </IconButton>
              <Typography>{user?.username}</Typography>
            </div>
            <TextField
              variant="standard"
              placeholder="Write something here..."
              id="post"
              name="post"
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={10}
              sx={{
                width: "500px",
              }}
            />
            <div
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "left",
                display: "flex",
              }}
            >
              {images && (
                <div
                  style={{
                    marginTop: "22px",
                    marginRight: "8px",
                    position: "relative",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setImages("");
                    }}
                    sx={{
                      top: "-5%",
                      right: "-5%",
                      position: "absolute",
                    }}
                  >
                    <Close />
                  </IconButton>
                  <Img src={images} />
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <div>
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleFileInputChange}
                />
                <Tooltip title="Attach photo" placement="top" arrow>
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Tooltip>
              </div>
              {description || images.length > 0 ? (
                <Button autoFocus variant="contained" onClick={handlePost}>
                  Post
                </Button>
              ) : (
                <Button variant="contained" disabled>
                  Post
                </Button>
              )}
            </Stack>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
