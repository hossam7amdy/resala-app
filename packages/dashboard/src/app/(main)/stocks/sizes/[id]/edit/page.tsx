import { findSizeById } from '@/data/sizes';
import EditForm from '@/features/sizes/form';
import React from 'react';

const EditSizePage = async ({ params }: { params: { id: string } }) => {
  const size = await findSizeById(params.id);

  return <EditForm size={size} />;
};

export default EditSizePage;
