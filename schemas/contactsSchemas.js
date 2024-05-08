import Joi from 'joi';

export const createContactSchema = Joi.object({
	name: Joi.string().required().min(3).max(15),
	email: Joi.string().email().required(),
	phone: Joi.string().required().min(5).max(15),
});

export const updateContactSchema = Joi.object({
	name: Joi.string().required().min(3).max(15),
	email: Joi.string().email().required(),
	phone: Joi.string().required().min(5).max(15),
});
