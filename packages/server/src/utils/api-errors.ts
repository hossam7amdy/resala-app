export class APPError extends Error {
  constructor(
    public statusCode: 400 | 401 | 403 | 404 | 409 | 500,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends APPError {
  constructor(message = 'Bad request. Please check your request and try again.') {
    super(400, message);
  }
}

export class NotFoundError extends APPError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class UnauthorizedError extends APPError {
  constructor(message = 'Unauthorized. Please login.') {
    super(401, message);
  }
}

export class ForbiddenError extends APPError {
  constructor(message = 'Forbidden. You do not have permission to access this resource.') {
    super(403, message);
  }
}

export class ConflictError extends APPError {
  constructor(message = 'Conflict. Resource already exists.') {
    super(409, message);
  }
}

export class InternalServerError extends APPError {
  constructor(message = 'Internal server error. Please try again later.') {
    super(500, message);
  }
}
