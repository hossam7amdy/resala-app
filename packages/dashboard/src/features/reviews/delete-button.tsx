'use client';

import { deleteReview } from '@/actions/reviews';
import { PopconfirmDeleteButton } from '@/components';

interface DeleteButtonProps {
  id: string;
  userId: string;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, userId }) => {
  return <PopconfirmDeleteButton onConfirmDelete={() => deleteReview(id, userId)} />;
};
