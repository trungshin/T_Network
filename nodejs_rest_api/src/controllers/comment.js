import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";

export const createComment = async (req, res) => {
	try {
		const user = await User.findById(req.body.postUserId);
		const createComment = {
			...req.body,
			postId: req.params.id,
			username: user.username,
			avatar: user.avatar
		};
		const newComment = new Comment(createComment);
		await Post.findByIdAndUpdate(req.params.id, { $push: { comments: newComment._id } }, { returnDocument: "after" });
		const savedComment = await newComment.save();
		res.status(200).json(savedComment);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const updateComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		if (comment.postUserId === req.body.userId) {
			console.log("content: ", req.body.content);
			await comment.updateOne({ $set: { content: req.body.content } });
			res.status(200).json("Update Success!");
		} else {
			return res.status(403).json("You can only update your comment");
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		await Comment.findByIdAndDelete(req.params.id);
		await Post.findOneAndUpdate({ _id: comment.postId }, { $pull: { comments: req.params.id } }, { new: true });
		res.status(200).json("Delete comment succesfully");
	} catch (err) {
		res.status(500).json(err);
	}
};
