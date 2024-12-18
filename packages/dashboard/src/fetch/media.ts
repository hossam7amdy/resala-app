'use server';

import { ROUTES } from '@/routes';
import { mediaService } from '@/services';
import { formatError } from '@/utils/formatError';
import { ListMediaSchema, SetMediaMetadataSchema } from '@resala/shared';
import type { ListMediaRequest, SetMediaMetadataRequest } from '@resala/shared';
import { revalidatePath } from 'next/cache';

const getUploadUrl = async (id: string) => {
  return await mediaService.getUploadUrl(id);
};

const setMediaMetadata = async (id: string, data: SetMediaMetadataRequest['body']) => {
  data = SetMediaMetadataSchema.shape.body.parse(data);

  const media = await mediaService.setMetadata(id, data);

  revalidatePath(ROUTES.MEDIA);
  return media;
};

const listMedias = async (query: ListMediaRequest['query']) => {
  query = ListMediaSchema.shape.query.parse(query);
  return await mediaService.listMedia(query);
};

const countMedia = async () => {
  return await mediaService.count();
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

export { getUploadUrl, setMediaMetadata, listMedias, countMedia, deleteMedia };
