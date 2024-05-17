import Joi from 'joi';

export const createContactSchema = Joi.object({
	name: Joi.string().required().min(3).max(15).messages({
		'string.base': `name must be a string`,
		'string.min': `name must have at least {#limit} characters`,
		'string.max': `name must have at most {#limit} characters`,
		'any.required': `name is required`,
		'string.empty': `name cannot be an empty field`,
	}),
	email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
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
	favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
	name: Joi.string().min(3).max(15).messages({
		'string.base': `name must be a string`,
		'string.min': `name must have at least {#limit} characters`,
		'string.max': `name must have at most {#limit} characters`,
		'string.empty': `name cannot be an empty field`,
	}),
	email: Joi.string().email({ minDomainSegments: 2 }).messages({
		'string.email': `email must be a valid email address with "@" symbol`,
		'string.empty': `email cannot be an empty field`,
	}),
	phone: Joi.string()
		.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
		.messages({
			'string.pattern.base': `phone must be a valid phone number in the format (999) 999-9999`,
			'string.empty': `phone cannot be an empty field`,
		}),
	favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		'any.required': `favorite must be provided for update`,
		'boolean.base': `favorite field must be a boolean value`,
	}),
});
