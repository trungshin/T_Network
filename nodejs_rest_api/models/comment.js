import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
	{
		postId: {
			type: String
		},
		postUserId: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		username: {
			type: String
		},
		avatar: {
			type: String
		}
	},
	{ timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
