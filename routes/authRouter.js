import express from 'express';
import {
	registerSchema,
	loginSchema,
	subscriptionSchema,
	verifyEmailSchema,
} from '../schemas/authSchemas.js';
import { jsonParser } from '../middlewares/jsonParser.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import {
	registerUser,
	verifyEmail,
	resendingVerifyEmail,
	loginUser,
	getCurrent,
	logout,
	updateSubscription,
	updateAvatar,
} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post(
	'/register',
	jsonParser,
	validateBody(registerSchema),
	registerUser
);

authRouter.get('/verify/:token', verifyEmail);

authRouter.post(
	'/verify',
	jsonParser,
	validateBody(verifyEmailSchema),
	resendingVerifyEmail
);

authRouter.post('/login', jsonParser, validateBody(loginSchema), loginUser);

authRouter.get('/current', authenticate, getCurrent);

authRouter.patch(
	'/',
	jsonParser,
	authenticate,
	validateBody(subscriptionSchema),
	updateSubscription
);

authRouter.patch(
	'/avatars',
	authenticate,
	upload.single('avatar'),
	updateAvatar
);

authRouter.post('/logout', authenticate, logout);

export default authRouter;
