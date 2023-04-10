import { Router } from "express";
import {
	createPost,
	deletePost,
	updatePost,
	getAPost,
	getPostFromUser,
	getFriendsPost,
	getAllPosts,
	likePost,
	unLikePost
} from "../controllers/post";
import { createComment, getCommentsInPost, deleteComment } from "../controllers/comment";
import Post from "../models/post";
import { verifyToken, UserPostAuthorization, paginatedResult, commentAuthorization } from "../controllers/middleware";
import upload from "../utils/multer";

export function postRouter() {
	const router = Router();

	//CREATE A POST
	router.post("/", upload.single("image"), verifyToken, createPost);

	//DELETE A POST
	router.delete("/:id", UserPostAuthorization, deletePost);

	//UPDATE A POST
	router.put("/:id", UserPostAuthorization, updatePost);

	//LIKE A POST
	router.patch("/:id/like", verifyToken, likePost);

	//UNLIKE A POST
	router.patch("/:id/unlike", verifyToken, unLikePost);

	//GET A POST
	router.get("/:id", verifyToken, getAPost);

	//GET ALL POST FROM A USER
	router.get("/user/:id", verifyToken, getPostFromUser);

	//GET TIMELINE POSTS
	router.post("/timeline", verifyToken, getFriendsPost);

	//GET ALL POSTS
	router.get("/", verifyToken, paginatedResult(Post), getAllPosts);

	//CREATE A COMMENT
	router.post("/comment/:id", verifyToken, createComment);

	// GET ALL COMMENTS IN A POST
	router.get("/comment/:id", verifyToken, getCommentsInPost);

	// DELETE A COMMENT
	router.delete("/comment/:id", commentAuthorization, deleteComment);

	return router;
}
