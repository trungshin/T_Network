import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			minlength: [3, "Must be at least 3 characters"],
			maxlength: [20, "Must be less than 20 characters"],
			unique: true
		},
		email: {
			type: String,
			require: true,
			maxlength: [50, "Must be 50 characters or less"],
			unique: true,
			validate: [isEmail, "Please enter a valid email"]
		},
		admin: {
			type: Boolean,
			default: false
		},
		password: {
			type: String,
			require: true,
			select: false,
			minlength: [6, "Must be 6 characters or more"]
		},
		avatar: {
			type: String,
			default: "https://res.cloudinary.com/dgh9mausg/image/upload/v1667554568/avatar_cr1k4z.png"
		},
		coverPhoto: {
			type: String,
			default: "https://res.cloudinary.com/dgh9mausg/image/upload/v1682011152/cover_photo.png"
		},
		followers: {
			type: Array,
			default: []
		},
		followings: {
			type: Array,
			default: []
		},
		gender: { type: String, default: "male" },
		mobile: { type: String, default: "" },
		address: { type: String, default: "" }
	},
	{ timestamps: true }
);

UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);
