'use server';

import { ROUTES } from '@/routes';
import { mediaService } from '@/services';
import { formatError } from '@/utils/formatError';
import { type SetMediaMetadataRequest, SetMediaMetadataSchema } from '@resala/shared';
import { revalidatePath } from 'next/cache';

const getUploadUrl = async (id: string) => {
  return await mediaService.getUploadUrl(id);
};

const setMediaMetadata = async (id: string, data: SetMediaMetadataRequest['body']) => {
  try {
    data = await SetMediaMetadataSchema.shape.body.parseAsync(data);

    const media = await mediaService.setMetadata(id, data);

    revalidatePath(ROUTES.MEDIA);
    return media;
  } catch (error) {
    return formatError(error);
  }
};

const listMedias = async () => {
  return await mediaService.listMedia();
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
