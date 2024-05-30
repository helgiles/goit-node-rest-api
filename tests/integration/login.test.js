import dotenv from 'dotenv';
dotenv.config();

import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from './appTest.js';
import { User } from '../../models/user';

mongoose.set('strictQuery', false);

const dbTestURI = process.env.DB_TEST_URI;

describe('login', () => {
	let testUser;

	beforeAll(async () => {
		await mongoose.connect(dbTestURI);
		await User.deleteMany();

		const hashedPassword = await bcrypt.hash('password', 10);
		testUser = new User({
			email: 'testUser@mail.com',
			password: hashedPassword,
			subscription: 'starter',
		});

		await testUser.save();
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});

	it('should login user with correct credentials', async () => {
		const response = await supertest(app).post('/api/users/login').send({
			email: 'testUser@mail.com',
			password: 'password',
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('token');
		expect(response.body.user).toHaveProperty('email', 'testUser@mail.com');
		expect(response.body.user).toHaveProperty('subscription', 'starter');
	});

	it('should not login user with incorrect credentials', async () => {
		const response = await supertest(app).post('/api/users/login').send({
			email: 'wrongUser@mail.com',
			password: 'wrongPassword',
		});

		console.log(response.body);
		expect(response.statusCode).toBe(401);
		expect(response.body).toHaveProperty(
			'message',
			'Email or password is incorrect'
		);
	});
});
