import express from 'express';
import {
	registerSchema,
	loginSchema,
	subscriptionSchema,
} from '../schemas/authSchemas.js';
import { jsonParser } from '../middlewares/jsonParser.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
	registerUser,
	loginUser,
	getCurrent,
	logout,
	updateSubscription,
} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post(
	'/register',
	jsonParser,
	validateBody(registerSchema),
	registerUser
);

authRouter.post('/login', jsonParser, validateBody(loginSchema), loginUser);

authRouter.get('/current', authenticate, getCurrent);

authRouter.patch(
	'/:id',
	jsonParser,
	authenticate,
	validateBody(subscriptionSchema),
	updateSubscription
);

authRouter.post('/logout', authenticate, logout);

export default authRouter;
