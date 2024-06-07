import Joi from 'joi';

export const registerSchema = Joi.object({
	email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
		'string.email': `email must be a valid email address with "@" symbol`,
		'any.required': `email is required`,
		'string.empty': `email cannot be an empty field`,
	}),
	password: Joi.string().min(6).required().messages({
		'string.password': `password must be a valid email`,
		'any.required': `password is required`,
		'string.empty': `password cannot be an empty field`,
	}),
});

export const verifyEmailSchema = Joi.object({
	email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
		'string.email': `email must be a valid email address with "@" symbol`,
		'any.required': `email is required`,
		'string.empty': `email cannot be an empty field`,
	}),
});

export const loginSchema = Joi.object({
	email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
		'string.email': `email must be a valid email address with "@" symbol`,
		'any.required': `email is required`,
		'string.empty': `email cannot be an empty field`,
	}),
	password: Joi.string().min(6).required().messages({
		'string.password': `password must be a valid email`,
		'any.required': `password is required`,
		'string.empty': `password cannot be an empty field`,
	}),
});

export const subscriptionSchema = Joi.object({
	subscription: Joi.string()
		.valid('starter', 'pro', 'business')
		.required()
		.messages({
			'string.email': `subscription must be one of 'starter', 'pro', 'business'`,
			'any.required': `subscription is required`,
			'string.empty': `subscription cannot be an empty field`,
		}),
});
