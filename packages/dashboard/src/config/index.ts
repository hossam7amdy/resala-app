const configuration = {
  baseUrl: process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000',
};

export type Configuration = typeof configuration;
export { configuration };
