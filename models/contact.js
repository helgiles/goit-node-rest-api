import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

export const Contact = mongoose.model('contact', contactSchema);
