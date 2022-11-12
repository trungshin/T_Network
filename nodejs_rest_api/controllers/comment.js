import Post from "../models/post";
import Comment from "../models/comment";
import User from "../models/user";

export const createComment = async (req, res) => {
	try {
		const user = await User.findById(req.body.postUserId);
		await Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { comments: 1 } });
		const createComment = {
			...req.body,
			postId: req.params.id,
			username: user.username,
			avatar: user.avatar
		};
		const newComment = new Comment(createComment);
		const savedComment = await newComment.save();
		res.status(200).json(savedComment);
	} catch (err) {
		res.status(500).json(err);
	}
	//     const { postId, content, postUserId } = req.body;
	//     const post = await Post.findById(postId);
	//     if (post) {
	//       const newComment = new Comment({
	//           user: req.user.id, content, postUserId, postId
	//       });

	//       await Post.findOneAndUpdate({_id: postId}, {
	//           $push: {comments: newComment.id}
	//       }, {new: true});

	//       const savedComment = await newComment.save();

	//       res.status(200).json(savedComment);
	//     } else {
	//       return res.status(400).json("This post does not exist.");
	//     }
	// } catch (err) {
	//     return res.status(500).json(err)
	// }
};

export const getCommentsInPost = async (req, res) => {
	try {
		const comments = await Comment.find({ postId: req.params.id });
		res.status(200).json(comments);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		await Comment.findByIdAndDelete(req.params.id);
		await Post.findOneAndUpdate({ _id: comment.postId }, { $inc: { comments: -1 } });
		res.status(200).json("Delete comment succesfully");
	} catch (err) {
		res.status(500).json(err);
	}
};
