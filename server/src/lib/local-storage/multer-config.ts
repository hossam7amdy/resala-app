import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { BadRequestError } from '../error/http-errors';

const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

// multer configuration
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// multer filter
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
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
