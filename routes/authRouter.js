import express from 'express';
import { registerSchema, loginSchema } from '../schemas/authSchemas.js';
import { validateBody } from '../helpers/validateBody.js';
import { registerUser, loginUser } from '../controllers/authControllers.js';

const jsonParser = express.json();

const authRouter = express.Router();

authRouter.post(
	'/register',
	jsonParser,
	validateBody(registerSchema),
	registerUser
);

authRouter.post('/login', jsonParser, validateBody(loginSchema), loginUser);

export default authRouter;
