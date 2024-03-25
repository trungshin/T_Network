import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "./sendEmail.js";

const { CLIENT_URL } = process.env;

export const register = async (req, res) => {
	const { username, email, password } = req.body;
	if (password.length >= 6) {
		try {
			//generate salt to hash password
			const salt = await bcrypt.genSalt(10);
			//set user password to hashed password
			const hashedPassword = await bcrypt.hash(password, salt);

			const user = await User.findOne({ email });
			if (!user) {
				//create new user
				const newUser = {
					username,
					email,
					password: hashedPassword
				};

				const activationToken = generateActivationToken(newUser);
				const url = `${CLIENT_URL}/user/activate/${activationToken}`;
				sendEmail(email, username, url, "Verify your email address");

				res.status(200).json("Register Success! Please activate your email to start.");
			} else {
				return res.status(400).json("This email already exists.");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(401).json("Must be 6 character or more");
	}
};

export const activateEmail = async (req, res) => {
	try {
		const { activationToken } = req.body;
		const user = jwt.verify(activationToken, process.env.JWT_ACTIVATION_KEY);

		const { username, email, password } = user;

		const checkEmail = await User.findOne({ email });
		if (!checkEmail) {
			const newUser = new User({
				username,
				email,
				password
			});

			await newUser.save();

			res.status(200).json("Account has been activated!");
		} else {
			return res.status(400).json("This email already exists.");
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const generateAccessToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			admin: user.admin
		},
		process.env.JWT_ACCESS_KEY,
		{ expiresIn: "60d" }
	);
};

export const generateRefreshToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			admin: user.admin
		},
		process.env.JWT_REFRESH_KEY,
		{ expiresIn: "365d" }
	);
};

export const generateActivationToken = (user) => {
	return jwt.sign(user, process.env.JWT_ACTIVATION_KEY, { expiresIn: "60d" });
};

export const login = async (req, res) => {
	try {
		//find the user's email in the model
		const user = await User.findOne({ email: req.body.email }).select("+password");
		if (!user) {
			res.status(404).json("User not found");
			return;
		}

		//compare the user-entered password with the hashed password
		const matchPassword = await bcrypt.compare(req.body.password, user.password);

		if (!matchPassword) {
			res.status(400).json("Wrong password");
			return;
		} else if (user && matchPassword) {
			//Generate access token
			const accessToken = generateAccessToken(user);
			//Generate refresh token
			const refreshToken = generateRefreshToken(user);

			//STORE REFRESH TOKEN IN COOKIE
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
				path: "/",
				sameSite: "strict"
			});

			const { password, ...others } = user._doc;
			res.status(200).json({ ...others, accessToken });
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

export const requestRefreshToken = async (req, res) => {
	//Take refresh token from user
	const refreshToken = req.cookies.refreshToken;
	//Send error if token is not valid
	if (!refreshToken) return res.status(401).json("You're not authenticated");

	jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
		if (err) {
			console.log(err);
		}
		//create new access token, refresh token and send to user
		const newAccessToken = generateAccessToken(user);
		const newRefreshToken = generateRefreshToken(user);
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			path: "/",
			sameSite: "strict"
		});
		res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken
		});
	});
};

export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json("This email does not exist.");
		} else {
			const accessToken = generateAccessToken(user);
			const url = `${CLIENT_URL}/user/reset/${accessToken}`;

			sendEmail(email, user.username, url, "Reset your password");
			res.status(200).json("Re-send the password, please check your email.");
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const resetPassword = async (req, res) => {
	try {
		const password = req.body.password;

		//generate salt to hash password
		const salt = await bcrypt.genSalt(10);
		//set user password to hashed password
		const hashedPassword = await bcrypt.hash(password, salt);

		await User.findOneAndUpdate(
			{ _id: req.user.id },
			{
				password: hashedPassword
			}
		);

		res.status(200).json("Password successfully changed!");
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const logOut = async (req, res) => {
	//Clear cookies when user logs out
	res.clearCookie("refreshToken");
	res.status(200).json("Logged out successfully!");
};
