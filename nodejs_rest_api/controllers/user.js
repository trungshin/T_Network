import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import cloudinary from "../utils/cloudinary";

export const getUser = async (req, res) => {
	try {
		//find the user ID
		const user = await User.findById(req.params.id);
		console.log(user);
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteUser = async (req, res) => {
	try {
		//find the user ID and delete that user
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).json("Account " + user.username + " has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
};

export const updateUser = async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.body.avatar, {
			upload_preset: "network_library"
		});

		const user = await User.findByIdAndUpdate(req.params.id, {
			$set: {
				...req.body,
				avatar: result.secure_url
			}
		});
		if (req.body.avatar) {
			try {
				await Post.updateMany(
					{ userId: req.params.id },
					{
						$set: { avatar: req.body.avatar }
					}
				);
				await Comment.updateMany(
					{ postUserId: req.params.id },
					{
						$set: { avatar: req.body.avatar }
					}
				);
			} catch (err) {
				return res.status(500).json(err);
			}
		}
		console.log(req.body);

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const followUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			// find the user ID
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				const updateUser = await currentUser.updateOne({
					$push: { followings: req.params.id }
				});
				res.status(200).json(updateUser);
			} else {
				res.status(403).json("You already follow " + user.username);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can't follow yourself");
	}
};

export const unFollowUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			//find the user ID
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				const updateUser = await currentUser.updateOne({
					$pull: { followings: req.params.id }
				});
				res.status(200).json(updateUser);
			} else {
				res.status(403).json("You don't follow " + user.username);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can't unfollow yourself");
	}
};

export const searchUser = async (req, res) => {
	try {
		const username = req.query.username;
		const user = await User.find({ username: { $regex: username } })
			.limit(10)
			.select("username avatar")
			.exec();
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};
