import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		username: {
			type: String
		},
		description: {
			type: String
		},
		avatar: {
			type: String
		},
		img: {
			type: String
		},
		cloudinaryId: {
			type: String
		},
		likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
		// comments: {
		// 	type: Number,
		// 	default: 0
		// }
		comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }]
	},
	{ timestamps: true }
);

export default mongoose.model("Post", PostSchema);
