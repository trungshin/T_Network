import { getUser, deleteUser, updateUser, followUser, unFollowUser, getAllUsers } from "../controllers/user.js";
import { verifyToken, UserAuthorization } from "../controllers/middleware.js";
import { Router } from "express";

export function userRouter() {
	const router = Router();

	//UPDATE USER
	router.patch("/:id", UserAuthorization, updateUser);

	//DELETE USER
	router.delete("/:id", verifyToken, deleteUser);

	//GET A USER
	router.get("/:id", verifyToken, getUser);

	//GET ALL USERS
	router.get("/", verifyToken, getAllUsers);

	//FOLLOW A USER
	router.patch("/:id/follow", verifyToken, followUser);

	//UNFOLLOW A USER
	router.patch("/:id/unfollow", verifyToken, unFollowUser);

	return router;
}
