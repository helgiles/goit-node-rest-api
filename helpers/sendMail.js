import 'dotenv/config';
import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
	host: 'sandbox.smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: process.env.MAILTRAP_USERNAME,
		pass: process.env.MAILTRAP_PASSWORD,
	},
});

export const sendMail = message => {
	return transport.sendMail(message);
};
