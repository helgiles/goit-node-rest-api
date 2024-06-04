import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: 6,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ['starter', 'pro', 'business'],
			default: 'starter',
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: { type: String, required: false },
	},
	{ versionKey: false, timestamps: true }
);

export const User = mongoose.model('user', userSchema);
