export * from './env.d.ts';

export interface LocalUser {
  user: {
    id: string;
    email?: string;
  };
}
