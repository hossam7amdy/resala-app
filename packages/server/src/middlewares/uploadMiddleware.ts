import type { Request } from 'express';
import multer from 'multer';

import { BadRequestError } from '../utils/ApiErrors.js';

const FILE_SIZE_LIMIT = 1024 * 1024 * 50; // 50MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// multer filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new BadRequestError('File type not allowed'));
  }
  if (file.size > FILE_SIZE_LIMIT) {
    return cb(new BadRequestError('File size should be less than 5MB'));
  }

  cb(null, true);
};

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
});
