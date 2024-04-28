'use client';

import { updateCategory } from '@/actions/category';
import { GetCategoryResponse } from '@resala/shared';
import useMessage from 'antd/es/message/useMessage';
import React from 'react';
import { useFormState } from 'react-dom';

import SubmitButton from '../ui/submit-button';

const DisableButton = ({ category }: { category: GetCategoryResponse['data'] }) => {
  const handleDisable = updateCategory.bind(null, String(category.id), {
    enName: category.enName,
    arName: category.arName,
    categoryId: category.categoryId ?? undefined,
    deletedAt: category.deletedAt ? undefined : new Date(),
  });
  const [error, dispatch] = useFormState(handleDisable, undefined);

  const [messageApi, contextHolder] = useMessage();

  if (error) {
    messageApi.error(error.message);
  }

  const disabled = !!category.deletedAt;
  return (
    <form action={dispatch}>
      {contextHolder}
      <input type="hidden" name="enName" value={category.enName} />
      <SubmitButton size="small" danger={!disabled}>
        {disabled ? 'Enable' : 'Disable'}
      </SubmitButton>
    </form>
  );
};

export default DisableButton;
