import type { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import { BadRequestError } from '../../utils/api-errors.js';

// upload directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

// multer configuration
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// multer filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new BadRequestError('File type not allowed'));
  }
  if (file.size > 1024 * 1024 * 5) {
    return cb(new BadRequestError('File size should be less than 5MB'));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
});
