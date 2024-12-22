import { deleteStock } from '@/actions/stocks';
import { PopconfirmDeleteButton, ResalaTooltip } from '@/components';
import React from 'react';

interface DeleteStockButtonProps {
  id: string;
  isLastItem: boolean;
}
const DeleteStockButton: React.FC<DeleteStockButtonProps> = ({ id, isLastItem }) => {
  return (
    <ResalaTooltip
      title={isLastItem ? 'Cannot delete last item, please delete the product instead' : ''}
    >
      <PopconfirmDeleteButton disabled={isLastItem} onConfirmDelete={() => deleteStock(id)}>
        Delete
      </PopconfirmDeleteButton>
    </ResalaTooltip>
  );
};

export { DeleteStockButton };
