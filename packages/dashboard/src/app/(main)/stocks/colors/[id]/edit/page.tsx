import { findColorById } from '@/data/colors';
import { ColorForm } from '@/features/colors/form';
import React from 'react';

const EditColorPage = async ({ params }: { params: { id: string } }) => {
  const color = await findColorById(params.id);

  return <ColorForm color={color} />;
};

export default EditColorPage;
