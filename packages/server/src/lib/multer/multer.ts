import type { Request } from 'express';
import multer from 'multer';

import { BadRequestError } from '../../utils/api-errors.js';

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
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
