import { searchUser } from "../controllers/user.js";
import { verifyToken } from "../controllers/middleware.js";
import { Router } from "express";

export function searchRouter() {
	const router = Router();

	router.get("/", verifyToken, searchUser);

	return router;
}
