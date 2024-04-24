export const isDev = process.env.NODE_ENV === 'development';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const formatDateTime = (date: Date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(amount);
};
