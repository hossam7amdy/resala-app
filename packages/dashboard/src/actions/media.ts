'use server';

import { ROUTES } from '@/routes';
import { mediaService } from '@/services';
import { formatError } from '@/utils/formatError';
import { ListMediaSchema } from '@resala/shared';
import type { ListMediaRequest } from '@resala/shared';
import { revalidatePath } from 'next/cache';

const getUploadUrl = async (id: string) => {
  return await mediaService.getUploadUrl(id);
};

const listMedias = async (query: ListMediaRequest['query']) => {
  query = ListMediaSchema.shape.query.parse(query);
  return await mediaService.listMedia({ search: query.search });
};

const deleteMedia = async (id: string) => {
  try {
    const media = await mediaService.delete(id);

    revalidatePath(ROUTES.MEDIA);
    return media;
  } catch (error) {
    return formatError(error);
  }
};

export { getUploadUrl, listMedias, deleteMedia };
