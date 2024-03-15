export class APIError extends Error {
  constructor(
    public statusCode: 400 | 401 | 403 | 404 | 409 | 500,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends APIError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class ForbiddenError extends APIError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

export class ConflictError extends APIError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

export class InternalServerError extends APIError {
  constructor(message = 'Internal server error') {
    super(500, message);
  }
}
