import React from 'react';

const ProductPage = ({ params }: { params: Record<string, string> }) => {
  console.log(params.ahmed);

  return <div>ProductPage</div>;
};

export default ProductPage;
