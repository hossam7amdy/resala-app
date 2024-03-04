export type Request = FormData;
export type Response =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      message: string;
    };

export type LoginRequest = {};
export type LoginResponse = Response & {
  data: {
    accessToken: string;
  };
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type RegisterResponse = Response & {
  data: {
    accessToken: string;
  };
};
