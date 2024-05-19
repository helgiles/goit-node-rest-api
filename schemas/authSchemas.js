import Joi from 'joi';

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// const passwordRegexp =/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;

export const registerSchema = Joi.object({
	// name: Joi.string().required().min(3).max(15).messages({
	// 	'string.base': `name must be a string`,
	// 	'string.min': `name must have at least {#limit} characters`,
	// 	'string.max': `name must have at most {#limit} characters`,
	// 	'any.required': `name is required`,
	// 	'string.empty': `name cannot be an empty field`,
	// }),
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
