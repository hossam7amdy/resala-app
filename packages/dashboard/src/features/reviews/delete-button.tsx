'use client';

import { PopconfirmDeleteButton } from '@/components';
import { deleteReview } from '@/fetch/reviews';

interface DeleteButtonProps {
  id: string;
  userId: string;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, userId }) => {
  return <PopconfirmDeleteButton onConfirmDelete={() => deleteReview(id, userId)} />;
};
