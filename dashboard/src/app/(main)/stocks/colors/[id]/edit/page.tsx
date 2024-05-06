import EditForm from '@/components/colors/form';
import { findColorById } from '@/data/colors';
import React from 'react';

const EditColorPage = async ({ params }: { params: { id: string } }) => {
  const color = await findColorById(params.id);

  return <EditForm color={color} />;
};

export default EditColorPage;
