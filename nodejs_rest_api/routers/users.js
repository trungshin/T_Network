import { getUser, deleteUser, updateUser, followUser, unFollowUser, getAllUsers } from "../controllers/user";
import { verifyToken, UserAuthorization } from "../controllers/middleware";
import { Router } from "express";

export function userRouter() {
	const router = Router();

	//UPDATE USER
	router.patch("/:id", UserAuthorization, updateUser);

	//DELETE USER
	router.delete("/:id", verifyToken, deleteUser);

	//GET A USER
	router.get("/:id", verifyToken, getUser);
	// router.get("/:id", getUser);
	// router.post("/:id", getUser);

	//GET ALL USERS
	router.get("/", verifyToken, getAllUsers);

	//FOLLOW A USER
	router.put("/:id/follow", verifyToken, followUser);

	//UNFOLLOW A USER
	router.put("/:id/unfollow", verifyToken, unFollowUser);

	return router;
}
