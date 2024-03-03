export type Request = { [key: string]: any } | FormData;

export interface Response {
  success: boolean;
  data?: { [key: string]: any };
  error?: {
    message: string;
    [key: string]: any;
  };
}
