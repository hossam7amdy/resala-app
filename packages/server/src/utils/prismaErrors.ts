import { Prisma } from '@prisma/client';

type PrismaErrors = Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError;

export const formatPrismaError = (error: PrismaErrors): { code: number; message: string } => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return { code: 409, message: `Duplicate field value: ${error.meta?.target}` };
      case 'P2014':
        return { code: 400, message: `Invalid ID: ${error.meta?.target}` };
      case 'P2003': {
        // Foreign key constraint failed
        const fieldName = error.meta?.field_name as string | undefined;
        const [resource1, resource2] = fieldName ? fieldName.split('_') : [];
        const errMsg = resource1 && resource2 ? `${resource1} and ${resource2}` : 'some resources';

        return {
          code: 400,
          message: `Invalid reference, there is a conflict with ${errMsg}`,
        };
      }
      case 'P2025':
        return { code: 404, message: (error.meta?.cause as string) ?? error.message };
      default:
        return { code: 400, message: 'Something went wrong with the database' };
    }
  }

  return { code: 400, message: 'Validation error, Invalid input data' };
};
