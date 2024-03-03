import { upload } from '../lib/local-storage';

/**
 * Returns middleware that processes a single file associated with the
 * given form field.
 *
 * The `Request` object will be populated with a `file` object containing
 * information about the processed file.
 *
 * @param fieldName Name of the multipart form field to process.
 */
export const uploadSingle = (fieldName: string) => {
  return upload.single(fieldName);
};

/**
 * Returns middleware that processes multiple files sharing the same field
 * name.
 *
 * The `Request` object will be populated with a `files` array containing
 * an information object for each processed file.
 *
 * @param fieldName Shared name of the multipart form fields to process.
 */
export const uploadMultiple = (fieldName: string) => {
  return upload.array(fieldName, 10);
};
