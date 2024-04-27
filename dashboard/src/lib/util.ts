export const isDev = process.env.NODE_ENV === 'development';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = (date: number | string | Date) => {
  const parsedDate = new Date(date);

  checkDate(parsedDate);

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: number | string | Date) => {
  const parsedDate = new Date(date);

  checkDate(parsedDate);

  return parsedDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const formatDateTime = (date: number | string | Date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(amount);
};

const checkDate = (date: Date) => {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
};
