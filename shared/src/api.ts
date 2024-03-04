export type Request<T> = T;
export type Response<T> =
  | {
      success: true;
      message?: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      errors?: any;
    };

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  accessToken: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type RegisterResponse = {
  accessToken: string;
};
