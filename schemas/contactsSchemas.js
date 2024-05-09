import Joi from 'joi';

export const createContactSchema = Joi.object({
	name: Joi.string().required().min(3).max(15).messages({
		'string.base': `name must be a string`,
		'string.empty': `name cannot be an empty field`,
		'string.min': `name must have at least {#limit} characters`,
		'string.max': `name must have at most {#limit} characters`,
		'any.required': `name is required`,
	}),
	email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
		'string.email': `email must be a valid email address with "@" symbol`,
		'any.required': `email is required`,
		'string.empty': `email cannot be an empty field`,
	}),
	phone: Joi.string()
		.required()
		.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
		.messages({
			'string.pattern.base': `phone must be a valid phone number in the format (999) 914-3792`,
			'any.required': `phone is required`,
			'string.empty': `phone cannot be an empty field`,
		}),
});

export const updateContactSchema = Joi.object({
	name: Joi.string().required().min(3).max(15).messages({
		'string.base': `name must be a string`,
		'string.empty': `name cannot be an empty field`,
		'string.min': `name must have at least {#limit} characters`,
		'string.max': `name must have at most {#limit} characters`,
		'any.required': `name is required`,
	}),
	email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
		'string.email': `email must be a valid email address with "@" symbol`,
		'any.required': `email is required`,
		'string.empty': `email cannot be an empty field`,
	}),
	phone: Joi.string()
		.required()
		.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
		.messages({
			'string.pattern.base': `phone must be a valid phone number in the format (999) 999-9999`,
			'any.required': `phone is required`,
			'string.empty': `phone cannot be an empty field`,
		}),
});
