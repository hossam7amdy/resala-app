import { ZodError, ZodIssue } from 'zod';

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join('.');

  return `${pathString}: ${message}`;
};

/**
 * Format the Zod error message with only the current error
 *
 * @param error - The Zod error
 * @returns {string | undefined} The formatted error message
 *
 * @see https://stackoverflow.com/questions/75883100/how-to-make-a-custom-error-message-in-zod
 */
export const formatZodError = (error: ZodError): string | undefined => {
  const { issues } = error;

  if (issues.length) {
    const currentIssue = issues[0];

    return formatZodIssue(currentIssue);
  }
};
