import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { userRouter, authRouter, postRouter, searchRouter } from "./routers";
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
		origin: "http://localhost:3000"
	})
);
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter());
app.use("/api/auth", authRouter());
app.use("/api/posts", postRouter());
app.use("/api/search", searchRouter());

app.listen(process.env.PORT || 8080, () => {
	console.log("Backend Server has been started!");
});
