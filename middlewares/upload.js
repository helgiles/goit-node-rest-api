import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';

const tempDir = path.resolve('tmp');

const multerConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, tempDir);
	},
	filename: (req, file, cb) => {
		const extname = path.extname(file.originalname);
		const basename = path.basename(file.originalname, extname);

		const suffix = crypto.randomUUID();

		const filename = `${basename}--${suffix}${extname}`;

		cb(null, filename);
	},
});

export const upload = multer({
	storage: multerConfig,
});
