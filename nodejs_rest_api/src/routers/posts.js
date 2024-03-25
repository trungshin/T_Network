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
} from "../controllers/post.js";
import { createComment, deleteComment, updateComment } from "../controllers/comment.js";
import Post from "../models/post.js";
import { verifyToken, UserPostAuthorization, paginatedResult, commentAuthorization } from "../controllers/middleware.js";
import upload from "../utils/multer.js";

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

	//UPDATE COMMENT
	router.patch("/comment/:id", verifyToken, updateComment);

	// DELETE A COMMENT
	router.delete("/comment/:id", commentAuthorization, deleteComment);

	return router;
}
