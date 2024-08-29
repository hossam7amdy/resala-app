'use client';

import { deleteReview } from '@/actions/review';
import { PopconfirmDeleteButton } from '@/components';

interface DeleteButtonProps {
  id: number;
  userId: number;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, userId }) => {
  return <PopconfirmDeleteButton onConfirmDelete={() => deleteReview(id, userId)} />;
};
