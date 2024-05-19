import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((_, res) => {
	res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
	const { status = 500, message = 'Server error' } = err;
	res.status(status).json({ message });
});

mongoose
	.connect(dbURI)
	.then(() => {
		console.info('Database connection successfully');
		app.listen(PORT, () => {
			console.log(`Server is running. Use our API on port: ${PORT}`);
		});
	})
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
