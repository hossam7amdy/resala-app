export class APIError extends Error {
  constructor(
    public statusCode: 400 | 422 | 401 | 403 | 404 | 409 | 429 | 500,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends APIError {
  constructor(message = 'Validation error. Please check your request and try again.') {
    super(422, message);
  }
}

export class BadRequestError extends APIError {
  constructor(message = 'Bad request. Please check your request and try again.') {
    super(400, message);
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class RateLimitError extends APIError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(429, message);
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = 'JWT token is missing or invalid') {
    super(401, message);
  }
}

export class ForbiddenError extends APIError {
  constructor(message = 'You do not have permission to access this resource.') {
    super(403, message);
  }
}

export class ConflictError extends APIError {
  constructor(message = 'Conflict. Resource already exists.') {
    super(409, message);
  }
}

export class InternalServerError extends APIError {
  constructor(message = 'Internal server error. Please try again later.') {
    super(500, message);
  }
}
