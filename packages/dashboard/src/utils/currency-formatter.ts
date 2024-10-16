export const formatCurrency = (amount: number, currency: string = 'EGP') => {
  return new Intl.NumberFormat('en-EG', {
    currency,
    style: 'currency',
  }).format(amount);
};
