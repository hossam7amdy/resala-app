import EditForm from '@/components/sizes/form';
import { findSizeById } from '@/data/sizes';
import React from 'react';

const EditSizePage = async ({ params }: { params: { id: string } }) => {
  const size = await findSizeById(params.id);

  return <EditForm size={size} />;
};

export default EditSizePage;
