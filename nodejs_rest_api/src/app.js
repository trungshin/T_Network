import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
// import { authRouter, userRouter, postRouter, searchRouter} from "./routers/index.js";
import { authRouter } from "./routers/auth.js";
import { userRouter } from "./routers/users.js";
import { postRouter } from "./routers/posts.js";
import { searchRouter } from "./routers/search.js";

const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log("MongoDB Connected!");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
	cors({
		origin: ["http://localhost:3000", "https://t-network.onrender.com"]
	})
);
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter());
app.use("/api/auth", authRouter());
app.use("/api/posts", postRouter());
app.use("/api/search", searchRouter());


if (process.env.BUILD_MODE === 'production') {
	app.listen(process.env.PORT, () => {
		console.log("Backend Server has been started at production!");
	});
} else {
	app.listen(process.env.APP_PORT || 8080, () => {
		console.log("Backend Server has been started!");
	});
}
