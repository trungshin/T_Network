import Post from "../models/post";
import Comment from "../models/comment";
import User from "../models/user";

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
		await Post.findOneAndUpdate({ _id: req.params.id }, { $push: {comments: newComment._id} }, {new: true});
		const savedComment = await newComment.save();
		res.status(200).json(savedComment);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getCommentsInPost = async (req, res) => {
	console.log("req.params.id: ", req.params.id);
	try {
		const comments = await Comment.find({ postId: req.params.id });
		console.log("cmts: ", comments);
		res.status(200).json(comments);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		await Comment.findByIdAndDelete(req.params.id);
		await Post.findOneAndUpdate({ _id: comment.postId }, { $pull: {comments: req.params.id} }, {new: true});
		res.status(200).json("Delete comment succesfully");
	} catch (err) {
		res.status(500).json(err);
	}
};
