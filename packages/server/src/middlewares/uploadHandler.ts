import type { Request } from 'express';
import multer from 'multer';

import { BadRequestError } from '../errors/api.errors.js';

const FILE_SIZE_LIMIT = 1024 * 1024 * 50; // 50MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export const validateImage = (file?: Express.Multer.File) => {
  if (!file) {
    throw new BadRequestError('File is required');
  }
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    throw new BadRequestError('File type not allowed');
  }
  if (file.size > FILE_SIZE_LIMIT) {
    throw new BadRequestError('File size should be less than 5MB');
  }
};

// multer filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  try {
    validateImage(file);

    return cb(null, true);
  } catch (error) {
    return cb(error as Error);
  }
};

export const uploadHandler = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
});
