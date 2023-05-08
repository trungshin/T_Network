import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import cloudinary from "../utils/cloudinary";

export const getUser = async (req, res) => {
	try {
		//find the otherUser ID
		const user = await User.findById(req.params.id);

		//returns a list of people the otherUser is following.
		const userFollowings = await Promise.all(
			user.followings.map((followingId) => {
				return User.findById(followingId);
			})
		);

		//returns a list of people who are following otherUser.
		const userFollowers = await Promise.all(
			user.followers.map((followerId) => {
				return User.findById(followerId);
			})
		);

		res.status(200).json({ user, userFollowings, userFollowers });
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
 		await User.findByIdAndDelete(req.params.id); //find the user ID and delete that user
		const userFollowingDeleted = await User.find({ followings: req.params.id });
		const userFollowerDeleted = await User.find({ followers: req.params.id });

		await Post.findOneAndDelete({userId: req.params.id});

		await Promise.all(
			userFollowingDeleted.map((followingDeletedId) => {
				return User.findByIdAndUpdate(
					followingDeletedId,
					{ $pull: { followings: req.params.id } },
					{ returnDocument: "after" }
				);
			})
		);

		await Promise.all(
			userFollowerDeleted.map((followerDeletedId) => {
				return User.findByIdAndUpdate(
					followerDeletedId,
					{ $pull: { followers: req.params.id } },
					{ returnDocument: "after" }
				);
			})
		);

		res.status(200).json();
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

			if (!user.followers.includes(req.body.userId)) {
				await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.body.userId } });
				const updateUser = await User.findByIdAndUpdate(
					req.body.userId,
					{
						$push: { followings: req.params.id }
					},
					{ returnDocument: "after" }
				);

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

			if (user.followers.includes(req.body.userId)) {
				await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.body.userId } });
				const updateUser = await User.findByIdAndUpdate(
					req.body.userId,
					{
						$pull: { followings: req.params.id }
					},
					{ returnDocument: "after" }
				);

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
		return res.status(200).json(err);
	}
};
