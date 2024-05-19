import { deleteProductImage } from '@/actions/product';
import DeleteButton from '@/components/ui/delete-button';
import React from 'react';

export const DeleteImage = ({ productId, imageId }: { productId: string; imageId: string }) => {
  return <DeleteButton deleteAction={deleteProductImage.bind(null, productId, imageId)} />;
};

export default DeleteImage;
